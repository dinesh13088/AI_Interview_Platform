from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class Account(models.Model):
    ROLE_CHOICES = [
        ('candidate', 'Candidate'),
        ('recruiter', 'Recruiter'),
    ]
    
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=128)  
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='candidate')
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    def set_password(self, raw_password):
        """Hash the password before saving"""
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        """Check if password matches"""
        return check_password(raw_password, self.password)
    
    def __str__(self):
        return self.username
