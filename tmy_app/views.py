# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from .models import TMYJob
# from .serializers import TMYJobSerializer
# from .tasks import process_climate_job

# class TMYJobViewSet(viewsets.ModelViewSet):
#     queryset = TMYJob.objects.all().order_by('-created_at')
#     serializer_class = TMYJobSerializer

#     def create(self, request):
#         serializer = TMYJobSerializer(data=request.data)
#         if serializer.is_valid():
#             job = serializer.save()
#             process_climate_job.delay(job.id)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @action(detail=True, methods=['get'])
#     def job_status(self, request, pk=None):
#         job = self.get_object()
#         return Response({
#             'status': job.status,
#             'result': job.result_file.url if job.result_file else None,
#             'error': job.error_message
#         })


from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TMYJob
from .serializers import TMYJobSerializer
from .tasks import process_climate_job
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny


class TMYSubmitView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = TMYJobSerializer(data=request.data)
        if serializer.is_valid():
            job = serializer.save(user=request.user)
            process_climate_job.delay(job.id)
            return Response({
                'job_id':    job.id,
                'site_name': job.site_name,
                'status':    job.status,
                'message':   'TMY job started!',
                'track_url': '/api/tmy/status/' + str(job.id) + '/',
            }, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TMYStatusView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, job_id):
        try:
            # job = TMYJob.objects.get(id=job_id)
            job = TMYJob.objects.get(id=job_id, user=request.user)
        except TMYJob.DoesNotExist:
            return Response({'error': 'Job not found'}, status=404)

        messages = {
    'pending':           'Job is waiting to start...',
    'downloading_era5':  'Downloading ERA5 climate data from Copernicus CDS...',
    'downloading_cams':  'Downloading CAMS solar radiation data from Copernicus ADS...',
    'processing_data':   'Processing and merging ERA5 + CAMS datasets...',
    'generating_tmy':    'Calculating Typical Meteorological Year (TMY)...',
    'generating_report': 'Generating plots and Word report...',
    'completed':         'TMY generation complete! Results ready to download.',
    'failed':            'Job failed. Check error_message for details.',
    'running':           'Job is currently running...',   
}

        return Response({
            'job_id':        job.id,
            'site_name':     job.site_name,
            'latitude':      job.latitude,
            'longitude':     job.longitude,
            'start_year':    job.start_year,
            'end_year':      job.end_year,
            'status':        job.status,
            'message':       job.status_message or messages.get(job.status, ''),
            'result_folder': str(job.result_file) if job.result_file else None,
            'error':         job.error_message,
            'created_at':    job.created_at,
            'updated_at':    job.updated_at,
        })


class TMYAllView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # jobs = TMYJob.objects.all().order_by('-created_at')
        jobs = TMYJob.objects.filter(user=request.user).order_by('-created_at')
        return Response({
            'total':     jobs.count(),
            'pending':   jobs.filter(status='pending').count(),
            'running':   jobs.filter(status='running').count(),
            'completed': jobs.filter(status='completed').count(),
            'failed':    jobs.filter(status='failed').count(),
            'jobs': [
                {
                    'id':        j.id,
                    'site_name': j.site_name,
                    'latitude':  j.latitude,
                    'longitude': j.longitude,
                    'status':    j.status,
                    'created_at': str(j.created_at),
                }
                for j in jobs
            ]
        })
class TMYInternalUpdateView(APIView):
    """
    Internal endpoint called from inside the notebook via requests.post()
    to update job status during execution.
    """
    permission_classes = [AllowAny] 
    def post(self, request, job_id):
        try:
            job = TMYJob.objects.get(id=job_id)
        except TMYJob.DoesNotExist:
            return Response({'error': 'Job not found'}, status=404)

        new_status = request.data.get('status')
        new_message = request.data.get('message', '')

        TMYJob.objects.filter(id=job_id).update(
            status=new_status,
            status_message=new_message
        )

        print(f"[Internal Update] Job #{job_id} → {new_status}: {new_message}")

        return Response({'ok': True, 'status': new_status})


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)

        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return Response(
            {'message': 'User created successfully'},
            status=status.HTTP_201_CREATED
        )
