from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TMYJobViewSet

router = DefaultRouter()
router.register(r'jobs', TMYJobViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]