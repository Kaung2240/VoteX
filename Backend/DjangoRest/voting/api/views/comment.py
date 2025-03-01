from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from ...models import Comment, VotingEvent
from ..serializers import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Get comments for a specific event.
        Only return top-level comments (no parent_comment).
        """
        event_id = self.kwargs.get('event_pk')
        return Comment.objects.filter(
            event_id=event_id,
            parent_comment__isnull=True
        ).order_by('-created_at')

    def perform_create(self, serializer):
        """
        Create a new comment or reply.
        """
        event = get_object_or_404(VotingEvent, pk=self.kwargs.get('event_pk'))
        parent_id = self.request.data.get('parent_comment')
        
        # If parent_id is provided, verify it exists and belongs to the same event
        if parent_id:
            parent = get_object_or_404(Comment, pk=parent_id, event=event)
            serializer.save(user=self.request.user, event=event, parent_comment=parent)
        else:
            serializer.save(user=self.request.user, event=event)

    def list(self, request, *args, **kwargs):
        """
        Custom list method to include a count of replies for each comment.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)