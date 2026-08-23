from django.db import models

from ..accounts.models import Account
from .validators import validate_resume_file  

class Application(models.Model):
    STATUS_CHOICES = (
        ('applied', 'Applied'),
        ('selected', 'Selected'),
        ('interview_scheduled', 'Interview Scheduled'),
        ('interview_completed', 'Interview Completed'),
        ('reviewed', 'Reviewed'),
        ('rejected', 'Rejected'),
        ('accepted', 'Accepted'),
    )
    candidate = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='applications')
    job = models.ForeignKey('jobs.Job', on_delete=models.CASCADE, related_name='applications')
    resume = models.FileField(upload_to='application_resumes/', validators=[validate_resume_file])
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='applied')
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('candidate', 'job')


class JobMatchAnalysis(models.Model):
    application = models.OneToOneField(Application, on_delete=models.CASCADE, related_name='match_analysis')
    matched_skills = models.JSONField(default=list)
    missing_skills = models.JSONField(default=list)
    experience_summary = models.TextField(blank=True)
    match_percentage = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)