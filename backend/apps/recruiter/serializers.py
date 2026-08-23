from rest_framework import serializers
from .models import RecruiterProfile
from ..companies.models import Company
from ..accounts.models import Account

class RecruiterSerializer(serializers.ModelSerializer):
    company_id = serializers.IntegerField(write_only=True, required=True)

    class Meta:
        model = RecruiterProfile
        fields = [
            'id', 'first_name', 'last_name', 'job_title',
            'company_id', 'phone_number', 'linkedin_url', 'company',
        ]
        read_only_fields = ['company']

    def create(self, validated_data):
        company_id = validated_data.pop('company_id')
        try:
            company = Company.objects.get(id=company_id)
        except Company.DoesNotExist:
            raise serializers.ValidationError({"company_id": "Company not found."})

        return RecruiterProfile.objects.create(company=company, **validated_data)

    

class RecruiterLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            raise serializers.ValidationError("Must include both email and password")
        
        try:
            
            user = Account.objects.get(email=email.lower())
            try:
                recruiter = user.recruiter_profile
                company=recruiter.company
            except user.recruiter_profile.RelatedObjectDoesNotExist:
                raise serializers.ValidationError("No candidate profile found for this account.")
            
        except Account.DoesNotExist:
            print("User NOT found!")
            raise serializers.ValidationError("Invalid email or password")
        
        
        print(f"Checking password...")
        password_valid = user.check_password(password)
        print(f"Password valid: {password_valid}")
        
        if not password_valid:
            print("Password check failed!")
            raise serializers.ValidationError("Invalid email or password")
        
        if not user.is_active:
            print("User is inactive!")
            raise serializers.ValidationError("Account is disabled")
        
        print("Login successful!")
        data['user'] = user
        data['recruiter']=recruiter
        data['company']=company
        return data