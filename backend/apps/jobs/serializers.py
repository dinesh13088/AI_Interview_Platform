from rest_framework import serializers
from .models import Job
from ..companies.models import Company

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'company', 'created_at']
        read_only_fields = ['created_at']

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name', 'location']


class GetJobSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)

    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'company', 'created_at']