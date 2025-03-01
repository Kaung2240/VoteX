# admin.py
from django.contrib import admin
from django.utils import timezone
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import (
    Profile, Category, VotingEvent, Candidate,
    Comment, Favorite, Notification, ActivityLog, Report
)

# Profile Inline for User Admin
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fields = ['timezone', 'profile_picture']

# Extend User Admin
class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline,)
    list_display = ('username', 'email', 'date_joined', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'email')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)

class CandidateInline(admin.TabularInline):
    model = Candidate
    extra = 1
    fields = ['name', 'description', 'profile_pic']

@admin.register(VotingEvent)
class VotingEventAdmin(admin.ModelAdmin):
    list_display = ('event_name', 'created_by', 'start_time', 'end_time', 'status')
    list_filter = ('is_private', 'categories', 'start_time')
    search_fields = ('event_name', 'created_by__username')
    filter_horizontal = ('categories',)
    inlines = [CandidateInline]
    readonly_fields = ('event_token',)
    
    def status(self, obj):
        now = timezone.now()
        if obj.start_time <= now <= obj.end_time:
            return 'Ongoing'
        return 'Upcoming' if now < obj.start_time else 'Ended'
    status.short_description = 'Event Status'

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('truncated_content', 'user', 'event', 'parent_comment', 'created_at')
    list_filter = ('event', 'created_at')
    search_fields = ('content', 'user__username')
    raw_id_fields = ('parent_comment',)

    def truncated_content(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    truncated_content.short_description = 'Content'

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'notification_type', 'related_event', 'is_read', 'created_at')
    list_filter = ('notification_type', 'is_read', 'created_at')
    search_fields = ('user__username', 'message')
    raw_id_fields = ('related_event', 'related_comment')
    date_hierarchy = 'created_at'

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('content_type', 'reporter', 'status', 'created_at', 'resolved_at')
    list_filter = ('content_type', 'status', 'created_at')
    search_fields = ('reason', 'reporter__username')
    readonly_fields = ('created_at',)
    fieldsets = (
        (None, {'fields': ('reporter', 'content_type', 'content_id')}),
        ('Details', {'fields': ('reason', 'status', 'admin_notes')}),
        ('Dates', {'fields': ('created_at', 'resolved_at')})
    )
    actions = ['mark_as_resolved']

    def mark_as_resolved(self, request, queryset):
        queryset.update(status='resolved', resolved_at=timezone.now())
    mark_as_resolved.short_description = "Mark selected reports as resolved"

@admin.register(ActivityLog)
class ActivityLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'ip_address', 'timestamp')
    list_filter = ('timestamp',)
    search_fields = ('action', 'user__username')
    readonly_fields = ('timestamp',)
    date_hierarchy = 'timestamp'

# Unregister default User admin and register custom
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

# For simple models
admin.site.register(Favorite)