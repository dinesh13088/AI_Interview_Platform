from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True) 
    website = models.URLField(blank=True)                
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True) # e.g., "Software / AI"
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name