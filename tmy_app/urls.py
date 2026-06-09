from django.urls import path
from .views import TMYSubmitView, TMYStatusView, TMYAllView, RegisterView, TMYInternalUpdateView, TMYDownloadView

urlpatterns = [
    path('submit/', TMYSubmitView.as_view()),
    path('status/<int:job_id>/', TMYStatusView.as_view()),
    path('all/', TMYAllView.as_view()),
    path('register/', RegisterView.as_view()),
    path('update-internal/<int:job_id>/', TMYInternalUpdateView.as_view()),
    path('download/<int:job_id>/', TMYDownloadView.as_view()),
]