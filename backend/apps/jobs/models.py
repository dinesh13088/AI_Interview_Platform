from django.db import models


class Job(models.Model):
    title = models.CharField(max_length=255)                  
    description = models.TextField()                         
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE) 
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return self.title