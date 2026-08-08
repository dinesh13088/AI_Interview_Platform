from rest_framework import serializers

from .models import Account

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = Account
        fields = ['id', 'username', 'email', 'password', 'confirm_password', 'role']
    
    def validate(self, data):
        """Check that passwords match"""
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords don't match"})
        return data
    
    def validate_email(self, value):
        """Check if email already exists"""
        if Account.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    
    def validate_username(self, value):
        """Check if username already exists"""
        if Account.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value
    
    def create(self, validated_data):
        
        validated_data.pop('confirm_password')
        
        account = Account.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            role=validated_data.get('role', 'candidate')
        )
        account.set_password(validated_data['password'])
        account.save()
        return account
    
    def update(self, instance, validated_data):
        """Update account details"""
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.role = validated_data.get('role', instance.role)
        
        # If password is being updated, hash it
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        
        instance.save()
        return instance

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        print(f"=== DEBUG LOGIN ===")
        print(f"Email received: {email}")
        print(f"Password received: {password}")
        
        if not email or not password:
            raise serializers.ValidationError("Must include both email and password")
        
        try:
            
            user = Account.objects.get(email=email.lower())
            try:
                candidate = user.canidates_profile
            except user.canidates_profile.RelatedObjectDoesNotExist:
                raise serializers.ValidationError("No candidate profile found for this account.")
            
            
            
            print(f"User found: {user.username}")
            print(f"Stored hash: {user.password}")

            print(f"candidate:",{candidate.first_name})
        except Account.DoesNotExist:
            print("User NOT found!")
            raise serializers.ValidationError("Invalid email or password")
        
        # Check password
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
        data['candidate']=candidate
        return data