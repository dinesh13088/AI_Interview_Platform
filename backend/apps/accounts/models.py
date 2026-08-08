from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser,PermissionsMixin


##due password hasing and validation django expect custom manager so it needs baseusermanager
class AccountManger(BaseUserManager):
    def create_user(self,username,email,password=None,role='candidate',**extra_fields):
        if not email:
            raise ValueError("email is required")
        email=self.normalize_email(email=email)
        user=self.model(username=username,email=email,role=role,**extra_fields)

        ##it is the hased password
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,username,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('role','recruiter')

        return self.create_user(username=username,email=email,password=password,**extra_fields)


##django provides default user model to create custome usermodel it need abstractbaseuser
##permissionmixin is important for django admin for permission

class Account(AbstractBaseUser,PermissionsMixin):
    ROLE_CHOICES = [
        ('candidate', 'Candidate'),
        ('recruiter', 'Recruiter'),
    ]

    ## these models are important because accountmanager's method called create_user create the user using these models
    
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=200, unique=True)
    ##no need to declare password field due to abstractbaseuser(it internally have it)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='candidate')
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)

    objects=AccountManger()

    USERNAME_FIELD='username'
    REQUIRED_FIELDS=['email']

    def __str__(self):
        return self.username
    
    
