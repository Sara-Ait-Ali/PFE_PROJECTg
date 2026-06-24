from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TMYJob
from .serializers import TMYJobSerializer
from .tasks import process_climate_job
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils import timezone
from datetime import timedelta
import os
import zipfile
import glob
import pandas as pd
from django.http import FileResponse, HttpResponse


def _resolve_folder(raw_path: str) -> str:
    if os.path.isabs(raw_path):
        return raw_path
    return os.path.join(os.getcwd(), raw_path)


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
            'job_id':         job.id,
            'site_name':      job.site_name,
            'latitude':       job.latitude,
            'longitude':      job.longitude,
            'start_year':     job.start_year,
            'end_year':       job.end_year,
            'status':         job.status,
            'message':        job.status_message or messages.get(job.status, ''),
            'result_folder':  str(job.result_file) if job.result_file else None,
            'error':          job.error_message,
            'created_at':     job.created_at,
            'updated_at':     job.updated_at,
            'selected_files': job.selected_files,
        })


class TMYAllView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        two_days_ago = timezone.now() - timedelta(days=2)
        jobs = TMYJob.objects.filter(
            user=request.user,
            created_at__gte=two_days_ago
        ).order_by('-created_at')[:3]

        jobs = list(jobs)
        return Response({
            'total': len(jobs),
            'jobs': [
                {
                    'id':         j.id,
                    'site_name':  j.site_name,
                    'latitude':   j.latitude,
                    'longitude':  j.longitude,
                    'status':     j.status,
                    'start_year': j.start_year,
                    'end_year':   j.end_year,
                    'created_at': str(j.created_at),
                    'selected_files': j.selected_files,
                }
                for j in jobs
            ]
        })


class TMYInternalUpdateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, job_id):
        try:
            job = TMYJob.objects.get(id=job_id)
        except TMYJob.DoesNotExist:
            return Response({'error': 'Job not found'}, status=404)

        new_status  = request.data.get('status')
        new_message = request.data.get('message', '')

        TMYJob.objects.filter(id=job_id).update(
            status=new_status,
            status_message=new_message
        )
        print(f"[Internal Update] Job #{job_id} -> {new_status}: {new_message}")
        return Response({'ok': True, 'status': new_status})


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email    = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)

        User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


class TMYDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, job_id):
        try:
            job = TMYJob.objects.get(id=job_id)
        except TMYJob.DoesNotExist:
            return Response({'error': 'Job not found'}, status=404)

        if job.status != 'completed':
            return Response({'error': 'Job not completed yet'}, status=400)

        result_folder = _resolve_folder(str(job.result_file))

        if not os.path.exists(result_folder):
            return Response({'error': f'Result folder not found: {result_folder}'}, status=404)

        zip_path = f'/tmp/TMY_{job.site_name}_{job_id}.zip'
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(result_folder):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname   = os.path.relpath(file_path, result_folder)
                    zipf.write(file_path, arcname)

        response = FileResponse(open(zip_path, 'rb'), content_type='application/zip')
        response['Content-Disposition'] = f'attachment; filename="TMY_{job.site_name}.zip"'
        return response


class TMYResultsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, job_id):
        try:
            job = TMYJob.objects.get(id=job_id, user=request.user)
        except TMYJob.DoesNotExist:
            return Response({'error': 'Job not found'}, status=404)

        if job.status != 'completed':
            return Response({'error': 'Job not completed yet'}, status=400)

        result_folder = _resolve_folder(str(job.result_file))
        site_name     = job.site_name

        print(f"[TMYResults] folder={result_folder} exists={os.path.exists(result_folder)}")

        stats        = {}
        monthly_ghi  = None
        monthly_temp = None

        # 1. Full dataset CSV
        dataset_path = os.path.join(result_folder, f'dataset_{site_name}.csv')
        if os.path.exists(dataset_path):
            try:
                df      = pd.read_csv(dataset_path, index_col=0, parse_dates=True)
                n_years = (job.end_year - job.start_year) + 1

                if 'GHI' in df.columns:
                    stats['annual_ghi'] = round(df['GHI'].sum() / 1000 / n_years)
                if 'DNI' in df.columns:
                    stats['annual_dni'] = round(df['DNI'].sum() / 1000 / n_years)
                if 'Temperature' in df.columns:
                    stats['mean_temp'] = round(float(df['Temperature'].mean()), 1)
                if 'Wind Speed' in df.columns:
                    stats['mean_wind'] = round(float(df['Wind Speed'].mean()), 2)

                if 'GHI' in df.columns:
                    avg_monthly = (
                        df['GHI'].resample('ME').sum()
                        .groupby(lambda x: x.month).mean() / 1000
                    ).round(1).tolist()
                    monthly_ghi = {'avg': avg_monthly, 'tmy': avg_monthly}

                if 'Temperature' in df.columns:
                    monthly_temp = (
                        df['Temperature'].resample('ME').mean()
                        .groupby(lambda x: x.month).mean()
                        .round(1).tolist()
                    )
            except Exception as e:
                print(f'[TMYResults] dataset error: {e}')

        # 2. TMY P50 pvgis CSV for monthly GHI
        tmy_matches = glob.glob(os.path.join(result_folder, 'tmy_files', '*P50*pvgis*.csv'))
        if not tmy_matches:
            tmy_matches = glob.glob(os.path.join(result_folder, 'tmy_files', '*P50*.csv'))

        if tmy_matches:
            try:
                tmy_df = pd.read_csv(tmy_matches[0], skiprows=3, index_col=0, parse_dates=True)
                col = next((c for c in ['GHI', 'ghi', 'G(h)'] if c in tmy_df.columns), None)
                if col:
                    tmy_monthly = (tmy_df[col].resample('ME').sum() / 1000).round(1).tolist()
                    if monthly_ghi:
                        monthly_ghi['tmy'] = tmy_monthly[:12]
                    else:
                        monthly_ghi = {'tmy': tmy_monthly[:12], 'avg': tmy_monthly[:12]}
            except Exception as e:
                print(f'[TMYResults] TMY P50 GHI error: {e}')

        # 3. Best months — pvgis CSV has header lines then: month,year
        best_months = {}
        tmy_p50 = glob.glob(os.path.join(result_folder, 'tmy_files', '*P50*pvgis*.csv'))
        if not tmy_p50:
            tmy_p50 = glob.glob(os.path.join(result_folder, 'tmy_files', '*P50*.csv'))

        if tmy_p50:
            try:
                df_p50 = pd.read_csv(tmy_p50[0], skiprows=3)
                print(f"[TMYResults] P50 cols={list(df_p50.columns)} head={df_p50.head(3).to_dict()}")
                MONTH_NAMES = [
                    'January','February','March','April','May','June',
                    'July','August','September','October','November','December'
                ]
                for _, row in df_p50.iterrows():
                    try:
                        m = int(row['month'])
                        y = int(row['year'])
                        if 1 <= m <= 12:
                            best_months[m] = {
                                'best_year':  y,
                                'month_name': MONTH_NAMES[m - 1],
                            }
                    except Exception:
                        continue
                print(f"[TMYResults] best_months={best_months}")
            except Exception as e:
                print(f'[TMYResults] P50 months error: {e}')

        # 4. Plot list
        plot_dir   = os.path.join(result_folder, 'plot')
        plot_files = []
        if os.path.exists(plot_dir):
            for fname in sorted(os.listdir(plot_dir)):
                if fname.lower().endswith(('.png', '.jpg', '.jpeg')):
                    plot_files.append({
                        'name': fname,
                        'url':  f'/api/tmy/plots/{job_id}/{fname}',
                    })

        return Response({
            'stats':        stats,
            'monthly_ghi':  monthly_ghi,
            'monthly_temp': monthly_temp,
            'best_months':  best_months,
            'plots':        plot_files,
        })


class TMYPlotView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, job_id, filename):
        try:
            job = TMYJob.objects.get(id=job_id, user=request.user)
        except TMYJob.DoesNotExist:
            return Response({'error': 'Job not found'}, status=404)

        result_folder = _resolve_folder(str(job.result_file))
        plot_path     = os.path.join(result_folder, 'plot', filename)

        if not os.path.exists(plot_path):
            return Response({'error': f'Plot not found: {plot_path}'}, status=404)

        ext = filename.lower().rsplit('.', 1)[-1]
        content_map = {'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg'}
        return FileResponse(open(plot_path, 'rb'), content_type=content_map.get(ext, 'image/png'))