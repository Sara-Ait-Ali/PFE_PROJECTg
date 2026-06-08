from django.urls import path
from .views import (
    TMYSubmitView,
    TMYStatusView,
    TMYAllView,
    TMYInternalUpdateView,
    RegisterView,
)
urlpatterns = [
    path('submit/', TMYSubmitView.as_view()),
    path('status/<int:job_id>/', TMYStatusView.as_view()),

]