from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ...models import Report
from ..serializers import ReportSerializer

class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Report.objects.all()
        return Report.objects.filter(reporter=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(reporter=self.request.user)