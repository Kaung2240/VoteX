from django.utils import timezone
from rest_framework import serializers
from ...models import Category, Candidate, VotingEvent
from django.utils.timezone import is_aware, make_aware
import pytz

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ['id', 'name', 'description', 'profile_pic', 'votes_count']
        read_only_fields = ['id','votes_count']


class VotingEventSerializer(serializers.ModelSerializer):
    candidates = CandidateSerializer(many=True, required=False)
    categories = CategorySerializer(many=True)
    status = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = VotingEvent
        fields = [
            'id', 'event_name', 'start_time', 'end_time', 'is_private', 'event_token',
            'created_by', 'categories', 'candidates', 'status', 'is_favorited'
        ]
        read_only_fields = ['created_by', 'event_token']

    def get_status(self, obj):
        request = self.context.get('request')
        now = timezone.now()

         # Convert to user's timezone if available
        if request and request.user.is_authenticated:
            try:
                profile = request.user.profile
                if profile.timezone:
                    user_tz = pytz.timezone(profile.timezone)
                    now = now.astimezone(user_tz)  # Convert UTC to user's local time
            except (AttributeError, pytz.UnknownTimeZoneError):
                # Handle missing profile or invalid timezone
                pass

        # Ensure event times are in the same timezone as 'now'
        start_time = obj.start_time.astimezone(now.tzinfo)
        end_time = obj.end_time.astimezone(now.tzinfo)

        if start_time <= now <= end_time:
            return 'ongoing'
        return 'upcoming' if now < start_time else 'ended'

    def get_is_favorited(self, obj):
        user = self.context.get('request').user
        return user.is_authenticated and obj.favorites.filter(user=user).exists()


class VotingEventCreateSerializer(serializers.ModelSerializer):
    candidates = CandidateSerializer(many=True)
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())

    class Meta:
        model = VotingEvent
        fields = ['event_name', 'start_time', 'end_time', 'is_private', 'categories', 'candidates']

    def validate(self, data):
        start_time = data['start_time']
        end_time = data['end_time']
        if not is_aware(start_time):
            start_time = make_aware(start_time)
        if not is_aware(end_time):
            end_time = make_aware(end_time)
        if start_time >= end_time:
            raise serializers.ValidationError("End time must be after start time")
        return data

    def create(self, validated_data):
        categories_data = validated_data.pop('categories', [])
        candidates_data = validated_data.pop('candidates', [])

        event = VotingEvent.objects.create(**validated_data)
        
        event.categories.set(categories_data)

        for candidate_data in candidates_data:
            Candidate.objects.create(voting_event=event, **candidate_data)
        return event
    
    def update(self, instance, validated_data):
        # Extract nested data
        categories_data = validated_data.pop('categories', [])
        candidates_data = validated_data.pop('candidates', [])

        # Update the VotingEvent instance
        instance = super().update(instance, validated_data)

        # Update categories (many-to-many field)
        instance.categories.set(categories_data)

        # Update or create candidates
        existing_candidates = {c.id: c for c in instance.candidates.all()}
        for candidate_data in candidates_data:
            candidate_id = candidate_data.get('id')
            if candidate_id and candidate_id in existing_candidates:
                # Update existing candidate
                candidate = existing_candidates[candidate_id]
                for key, value in candidate_data.items():
                    setattr(candidate, key, value)
                candidate.save()
            else:
                # Create new candidate
                Candidate.objects.create(voting_event=instance, **candidate_data)

        return instance