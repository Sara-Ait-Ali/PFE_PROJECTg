import os
import papermill as pm
from celery import shared_task
from .models import TMYJob


def update_status(job_id, status, message=''):
    TMYJob.objects.filter(id=job_id).update(
        status=status,
        status_message=message
    )
    print(f"[Job #{job_id}] {status}: {message}")


@shared_task
def process_climate_job(job_id):
    try:
        job = TMYJob.objects.get(id=job_id)

        output_dir    = os.path.join('TMYs', job.site_name)
        plot_dir      = os.path.join(output_dir, 'plot')
        tmy_files_dir = os.path.join(output_dir, 'tmy_files')

        os.makedirs(output_dir,    exist_ok=True)
        os.makedirs(plot_dir,      exist_ok=True)
        os.makedirs(tmy_files_dir, exist_ok=True)

        output_notebook = os.path.join(output_dir, f'output_{job_id}.ipynb')

        # Notebook updates status itself via HTTP during execution
        pm.execute_notebook(
            input_path='Tmy_Main_Script_full_api.ipynb',
            output_path=output_notebook,
            parameters={
                'lat':       job.latitude,
                'lon':       job.longitude,
                'site_name': job.site_name,
                'startDate': str(job.start_year) + '-01-01',
                'endDate':   str(job.end_year)   + '-12-31',
                'job_id':    job_id,
            }
        )

        # Mark completed after notebook finishes
        update_status(job_id, 'completed',
            'TMY generation complete! Results saved to TMYs/' + job.site_name + '/')

        job.refresh_from_db()
        job.result_file = output_dir
        job.save()

    except Exception as e:
        update_status(job_id, 'failed', str(e))


# import os
# import papermill as pm
# from celery import shared_task
# from .models import TMYJob



# @shared_task
# def process_climate_job(job_id):
#     job = TMYJob.objects.get(id=job_id)
#     try:
#         job.status = 'running'
#         job.save()

#         output_dir = os.path.join('TMYs', job.site_name)
#         plot_dir = os.path.join(output_dir, 'plot')
#         tmy_files_dir = os.path.join(output_dir, 'tmy_files')
        
#         # Create all needed folders
#         os.makedirs(output_dir, exist_ok=True)
#         os.makedirs(plot_dir, exist_ok=True)        
#         os.makedirs(tmy_files_dir, exist_ok=True)  

#         output_notebook = os.path.join(output_dir, f'output_{job_id}.ipynb')

#         pm.execute_notebook(
#             input_path='Tmy_Main_Script_full_api.ipynb',
#             output_path=output_notebook,
#             parameters={
#                 'lat':       job.latitude,
#                 'lon':       job.longitude,
#                 'site_name': job.site_name,
#                 'startDate': str(job.start_year) + '-01-01',
#                 'endDate':   str(job.end_year)   + '-12-31',
#             }
#         )

#         job.status = 'completed'
#         job.result_file = output_dir
#         job.save()

#     except Exception as e:
#         job.status = 'failed'
#         job.error_message = str(e)
#         job.save()







# @shared_task
# def process_climate_job(job_id):
#     job = TMYJob.objects.get(id=job_id)

#     try:
#         job.status = 'running'
#         job.save()

#         output_dir = os.path.join('TMYs', job.site_name)
#         os.makedirs(output_dir, exist_ok=True)

#         output_notebook = os.path.join(output_dir, f'output_{job_id}.ipynb')

#         pm.execute_notebook(
#             input_path='Tmy_Main_Script_full_api.ipynb',
#             output_path=output_notebook,
#             parameters={
#                 'lat':       job.latitude,
#                 'lon':       job.longitude,
#                 'site_name': job.site_name,
#                 'startDate': str(job.start_year) + '-01-01',
#                 'endDate':   str(job.end_year)   + '-12-31',
#             }
#         )

#         job.status      = 'completed'
#         job.result_file = output_dir
#         job.save()

#     except Exception as e:
#         job.status        = 'failed'
#         job.error_message = str(e)
#         job.save()


# import os
# import papermill as pm
# from celery import shared_task
# from .models import TMYJob

# @shared_task
# def process_climate_job(job_id):
#     job = TMYJob.objects.get(id=job_id)
#     try:
#         job.status = 'running'
#         job.save()

#         output_dir = os.path.join('TMYs', job.site_name)
#         os.makedirs(output_dir, exist_ok=True)
#         output_notebook = os.path.join(output_dir, f'output_{job_id}.ipynb')

#         pm.execute_notebook(
#             input_path='Tmy_Main_Script_full_api.ipynb',  # must be at project root
#             output_path=output_notebook,
#             parameters={
#                 'lat':       job.latitude,
#                 'lon':       job.longitude,
#                 'site_name': job.site_name,
#                 'startDate': str(job.start_year) + '-01-01',
#                 'endDate':   str(job.end_year)   + '-12-31',
#             }
#         )

#         job.status = 'completed'
#         job.result_file = output_dir
#         job.save()

#     except Exception as e:
#         job.status = 'failed'
#         job.error_message = str(e)
#         job.save()
        
        