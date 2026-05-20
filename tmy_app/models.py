from django.db import models

class TMYJob(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('running', 'Running'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    latitude = models.FloatField()
    longitude = models.FloatField()
    site_name = models.CharField(max_length=100)
    start_year = models.IntegerField(default=2005)
    end_year = models.IntegerField(default=2023)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    result_file = models.FileField(upload_to='results/', null=True, blank=True)
    error_message = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.site_name} ({self.status})"