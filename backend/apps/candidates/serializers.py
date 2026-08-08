from rest_framework import serializers
from .models import CandidateProfile
class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model=CandidateProfile
        fields=["first_name","last_name","phone_number","linkedin_url","upload_cv","picture"]

    def validate_phone_number(self,value):
        if CandidateProfile.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("phone number already exist")
        return value

    def create(self,validated_data):
        return CandidateProfile.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
        

