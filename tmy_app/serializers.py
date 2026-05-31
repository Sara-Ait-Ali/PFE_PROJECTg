from rest_framework import serializers
from .models import TMYJob

class TMYJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = TMYJob
        fields = '__all__'