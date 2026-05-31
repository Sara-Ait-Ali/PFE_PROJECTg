from celery import shared_task
from .models import TMYJob
from tmy_engine.processing import fetch_climate_data

@shared_task
def process_climate_job(job_id):
    job = TMYJob.objects.get(id=job_id)
    try:
        job.status = 'running'
        job.save()
        
        result_path = fetch_climate_data(
            job.latitude,
            job.longitude,
        )
        
        job.result_file = result_path
        job.status = 'done'
        job.save()
        
    except Exception as e:
        job.status = 'failed'
        job.error_message = str(e)
        job.save()