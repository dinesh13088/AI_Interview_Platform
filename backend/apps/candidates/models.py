from django.db import models
from ..accounts.models import Account
from django.core.exceptions import ValidationError
import os
def validate_resume_file(value):
    ext=os.path.splitext(value.name)[1].lower()
    allowed_extension=['.pdf','.doc','.docx']

    if ext not in allowed_extension:
        raise ValidationError("unsupported file types")

    max_size=5*1024*1024

    if value.size>max_size:
        raise(ValidationError("file is too large"))

           
class CandidateProfile(models.Model):
    account=models.OneToOneField(Account,on_delete=models.CASCADE,related_name='canidates_profile')
    first_name=models.CharField(max_length=100)
    last_name=models.CharField(max_length=100)
    phone_number=models.CharField(max_length=100)
    linkedin_url=models.CharField(max_length=300)
    upload_cv=models.FileField(
        upload_to='resume/',
        validators=[validate_resume_file],
        blank=True,
        null=True,
        verbose_name='Resume/cv'
    )
    picture=models.ImageField(
        upload_to='profile/',
        blank=True,
        null=True,
        default='profile_pcs/default.jpg'
    )
