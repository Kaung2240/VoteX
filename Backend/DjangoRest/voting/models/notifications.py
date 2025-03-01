# notifications.py
from django.db import models
from django.contrib.auth.models import User
from .events import VotingEvent
from .comments import Comment  # Add this import if comments exist in another file

class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ('event_start', 'Event Started'),
        ('event_reminder', 'Event Reminder'),
        ('comment_reply', 'Comment Reply'),
        ('vote_update', 'Vote Update'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    message = models.TextField()
    related_event = models.ForeignKey(
        VotingEvent, 
        null=True, 
        blank=True,  # Allows non-event related notifications
        on_delete=models.SET_NULL,
        db_index=True
    )
    related_comment = models.ForeignKey(  # New field for comment replies
        Comment, 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )
    is_read = models.BooleanField(default=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'User Notification'
        verbose_name_plural = 'User Notifications'

    def __str__(self):
        return f"{self.user.username} - {self.get_notification_type_display()} - {self.created_at:%Y-%m-%d}"