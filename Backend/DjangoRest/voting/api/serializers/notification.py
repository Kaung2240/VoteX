from rest_framework import serializers
from voting.models import Notification, VotingEvent

class NotificationSerializer(serializers.ModelSerializer):
    # Add a user field to link notifications to recipients (if missing in model)
    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Notification
        fields = [
            'id', 'user', 'notification_type', 'message', 
            'related_event', 'is_read', 'created_at'
        ]
        read_only_fields = ['user', 'created_at']

    # Optional: Add a hyperlink to the related event for API browsability
    related_event = serializers.HyperlinkedRelatedField(
        queryset=VotingEvent.objects.all(),
        view_name='votingevent-detail',
        required=False
    )