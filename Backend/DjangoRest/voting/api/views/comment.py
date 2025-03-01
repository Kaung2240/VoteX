from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from ...models import Comment, VotingEvent
from ..serializers import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        event_id = self.kwargs.get('event_pk')
        return Comment.objects.filter(event_id=event_id, parent_comment__isnull=True)

    def perform_create(self, serializer):
        event = VotingEvent.objects.get(pk=self.kwargs.get('event_pk'))
        serializer.save(user=self.request.user, event=event)