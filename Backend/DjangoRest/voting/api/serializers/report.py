from rest_framework import serializers
from voting.models import Report
from django.contrib.auth import get_user_model

User = get_user_model()

class ReportSerializer(serializers.ModelSerializer):
    # Automatically set the reporter to the current user
    reporter = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Report
        fields = [
            'id', 'reporter', 'content_type', 'content_id', 
            'reason', 'created_at'
        ]
        read_only_fields = ['created_at']

    # Optional: Validate reported content exists
    def validate(self, data):
        # Add logic to check if content_type/content_id exists
        return data