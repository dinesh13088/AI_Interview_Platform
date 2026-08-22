from django.db import models
class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    website = models.URLField(blank=True)
    logo = models.ImageField(
        upload_to="company_logos/",
        blank=True,
        null=True
    )
    industry = models.CharField(
        max_length=100,
        blank=True
    )
    description = models.TextField(blank=True)
    location = models.CharField(
        max_length=255,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name