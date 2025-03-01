from uuid import uuid4
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import Throttled
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.utils import timezone
from django.db.models import F
from rest_framework.filters import OrderingFilter

from ...models import VotingEvent, Candidate, Category, Favorite, ActivityLog, Vote
from ..throttles import VoteThrottle, AnonVoteThrottle
from ..serializers import VotingEventSerializer, VotingEventCreateSerializer, CandidateSerializer, CategorySerializer
from ..permissions import IsEventCreatorOrReadOnly, IsCandidateEditable

class VotingEventViewSet(viewsets.ModelViewSet):
    filter_backends = [OrderingFilter]
    ordering_fields = ['created_at', 'start_time', 'event_name']
    ordering = ['-created_at'] 
    serializer_class = VotingEventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsEventCreatorOrReadOnly]
    queryset = VotingEvent.objects.all().order_by('-created_at')
    throttle_classes = [VoteThrottle, AnonVoteThrottle]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:  # 👈 Include update actions
            return VotingEventCreateSerializer
        return VotingEventSerializer

    def get_queryset(self):
        queryset = VotingEvent.objects.all().order_by('-created_at')
        user = self.request.user

        # Filtering parameters
        status = self.request.query_params.get('status')
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        is_private = self.request.query_params.get('is_private')

        # Apply filters
        if status:
            now = timezone.now()
            if status == 'ongoing':
                queryset = queryset.filter(start_time__lte=now, end_time__gte=now)
            elif status == 'upcoming':
                queryset = queryset.filter(start_time__gt=now)
            elif status == 'ended':
                queryset = queryset.filter(end_time__lt=now)

        if category:
            queryset = queryset.filter(categories__name=category)

        if search:
            queryset = queryset.filter(event_name__icontains=search)

        if is_private:
            queryset = queryset.filter(is_private=is_private.lower() == 'true')

        return queryset.prefetch_related('categories', 'candidates')


    def perform_create(self, serializer):
        event = serializer.save(created_by=self.request.user)

        if event.is_private:
            event.event_token = uuid4().hex[:10].upper()
            event.save()


    @action(detail=True, methods=['post', 'delete'], permission_classes=[IsAuthenticated])
    def favorite(self, request, pk=None):
        event = self.get_object()
        if request.method == 'POST':
            Favorite.objects.get_or_create(user=request.user, event=event)
            return Response({'status': 'favorited'})
        else:
            Favorite.objects.filter(user=request.user, event=event).delete()
            return Response({'status': 'unfavorited'})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def vote(self, request, pk=None):
        event = self.get_object()
        candidate_id = request.data.get('candidate')

        self.check_throttles(request)

        # Check existing vote (using the Vote model directly)
        if Vote.objects.filter(voter=request.user, voting_event=event).exists():
            return Response(
                {'error': 'You have already voted in this event'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            candidate = event.candidates.get(id=candidate_id)
        except Candidate.DoesNotExist:
            return Response(
                {'error': 'Invalid candidate'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Increment votes_count (not the reverse relation)
        candidate.votes_count = F('votes_count') + 1
        candidate.save(update_fields=['votes_count'])

        # Create Vote record
        Vote.objects.create(
            voting_event=event,
            candidate=candidate,
            voter=request.user,
            is_anonymous=request.data.get('anonymous', False)
        )

        try:
            ActivityLog.objects.create(
                user=request.user if request.user.is_authenticated else None,
                action=f'Voted for {candidate.name} (ID: {candidate.id}) in {event.event_name} (ID: {event.id})',
                ip_address=self.get_client_ip(request)
            )
        except Exception as e:
            logger.error(f"Failed to create activity log: {e}")

        return Response({'status': 'Vote Completed.'})

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def throttled(self, request, wait):
        raise Throttled(detail={
            "error": "Too many action.",
            "message": f"Please wait {wait} seconds before to try again."
        })


class CandidateViewSet(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsCandidateEditable]
    queryset = Candidate.objects.all()
    http_method_names = ['get', 'put', 'patch', 'delete']

    def get_queryset(self):
        return Candidate.objects.filter(
            voting_event_id=self.kwargs['voting_event_pk']
        )


class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None