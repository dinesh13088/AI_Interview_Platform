from django.db import models

class RecruiterProfile(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=150, blank=True) # e.g., "Technical Talent Acquisition Lead"
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE, related_name='recruiters')
    phone_number = models.CharField(max_length=20, blank=True)
    linkedin_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.job_title})"


