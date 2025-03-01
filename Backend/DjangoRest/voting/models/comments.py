from django.db import models
from .events import VotingEvent
from django.contrib.auth.models import User

class Comment(models.Model):
    event = models.ForeignKey(VotingEvent, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    parent_comment = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} - {self.event.event_name}"