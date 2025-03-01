# reports.py
from django.db import models
from django.contrib.auth.models import User

class Report(models.Model):
    REPORT_TYPES = (
        ('event', 'Event'),
        ('comment', 'Comment'),
        ('user', 'User'),
    )
    
    STATUS_CHOICES = (
        ('pending', 'Pending Review'),
        ('investigating', 'Under Investigation'),
        ('resolved', 'Resolved'),
    )

    reporter = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='submitted_reports'
    )
    content_type = models.CharField(max_length=10, choices=REPORT_TYPES, db_index=True)
    content_id = models.PositiveIntegerField(db_index=True)
    reason = models.TextField()
    status = models.CharField(  # New status tracking
        max_length=15, 
        choices=STATUS_CHOICES, 
        default='pending',
        db_index=True
    )
    admin_notes = models.TextField(  # For resolution details
        blank=True, 
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Content Report'
        verbose_name_plural = 'Content Reports'
        indexes = [
            models.Index(fields=['content_type', 'content_id']),
        ]

    def __str__(self):
        return f"{self.get_content_type_display()} report ({self.status}) - {self.created_at:%Y-%m-%d}"