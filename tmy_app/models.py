# from django.db import models

# class TMYJob(models.Model):
#     STATUS_CHOICES = [
#         ('pending',           'Pending'),
#         ('running',           'Running'), 
#         ('downloading_era5',  'Downloading ERA5 Data'),
#         ('downloading_cams',  'Downloading CAMS Data'),
#         ('processing_data',   'Processing Data'),
#         ('generating_tmy',    'Generating TMY'),
#         ('generating_report', 'Generating Report'),
#         ('completed',         'Completed'),
#         ('failed',            'Failed'),
#     ]

#     latitude       = models.FloatField()
#     longitude      = models.FloatField()
#     site_name      = models.CharField(max_length=100)
#     start_year     = models.IntegerField(default=2005)
#     end_year       = models.IntegerField(default=2023)
#     status         = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
#     status_message = models.CharField(max_length=255, blank=True, null=True)
#     created_at     = models.DateTimeField(auto_now_add=True)
#     updated_at     = models.DateTimeField(auto_now=True)
#     result_file    = models.FileField(upload_to='results/', null=True, blank=True)
#     error_message  = models.TextField(null=True, blank=True)

#     def __str__(self):
#         return f"{self.site_name} ({self.status})"
from django.db import models
from django.contrib.auth.models import User


class TMYJob(models.Model):
    STATUS_CHOICES = [
        ('pending',           'Pending'),
        ('running',           'Running'),
        ('downloading_era5',  'Downloading ERA5 Data'),
        ('downloading_cams',  'Downloading CAMS Data'),
        ('processing_data',   'Processing Data'),
        ('generating_tmy',    'Generating TMY'),
        ('generating_report', 'Generating Report'),
        ('completed',         'Completed'),
        ('failed',            'Failed'),
    ]

    JOB_TYPE_CHOICES = [
        ('full',          'Download + Generate TMY'),
        ('download_only', 'Download Data Only'),
    ]

    user           = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    latitude       = models.FloatField()
    longitude      = models.FloatField()
    site_name      = models.CharField(max_length=100)
    start_year     = models.IntegerField(default=2005)
    end_year       = models.IntegerField(default=2023)
    job_type       = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES, default='full')
    selected_files = models.JSONField(default=list, blank=True)
    status         = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    status_message = models.CharField(max_length=255, blank=True, null=True)
    created_at     = models.DateTimeField(auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True)
    result_file    = models.FileField(upload_to='results/', null=True, blank=True)
    error_message  = models.TextField(null=True, blank=True)
    

    def __str__(self):
        return f"{self.site_name} ({self.status})"