from rest_framework import serializers
from .models import RecruiterProfile
from ..companies.models import Company

class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        company_id=serializers.IntegerField(write_only=True,required=True)
        model=RecruiterProfile
        fields=['id', 
            'first_name', 
            'last_name', 
            'job_title', 
            'company_id',
            'phone_number', 
            'linkedin_url', 
            'company',
            ]
        def create(self,validated_data):
            self.company_id=validated_data.pop('company_id')

            company=Company.objects.get(id=self.company_id)

            recruiter=RecruiterProfile.objects.create(
                company=company,
                **validated_data
            )
            return recruiter

    

    