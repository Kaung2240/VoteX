from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *

router = DefaultRouter()
router.register(r'events', VotingEventViewSet, basename='votingevent')  # Add basename
router.register(r'users', UserViewSet, basename='user')
router.register(r'events/(?P<event_pk>\d+)/comments', CommentViewSet, basename='event-comments')
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'reports', ReportViewSet, basename='report')
router.register(r'events/(?P<voting_event_pk>\d+)/candidates', CandidateViewSet, basename='event-candidates')


urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/password/reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

]