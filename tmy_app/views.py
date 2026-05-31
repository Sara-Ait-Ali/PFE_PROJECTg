from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import TMYJob
from .serializers import TMYJobSerializer
from .tasks import process_climate_job

class TMYJobViewSet(viewsets.ModelViewSet):
    queryset = TMYJob.objects.all().order_by('-created_at')
    serializer_class = TMYJobSerializer

    def create(self, request):
        serializer = TMYJobSerializer(data=request.data)
        if serializer.is_valid():
            job = serializer.save()
            process_climate_job.delay(job.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def job_status(self, request, pk=None):
        job = self.get_object()
        return Response({
            'status': job.status,
            'result': job.result_file.url if job.result_file else None,
            'error': job.error_message
        })