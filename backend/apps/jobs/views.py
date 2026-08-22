from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import JobSerializer,GetJobSerializer
from rest_framework import status
from .models import Job

class GetJobView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
            jobs=Job.objects.all()
            serializer=GetJobSerializer(jobs,many=True)
            return Response(serializer.data)
    
class JobView(APIView):
    permission_classes = [IsAuthenticated]
    

    def post(self, request):
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            job = serializer.save()
            company = job.company
            return Response(
                {
                    "message": "job is created successfully",
                    "job": {
                        "title": job.title,
                        "description": job.description,
                    },
                    "company": {
                        "id": company.id,
                        "name": company.name,
                        "website": company.website,
                        "logo": str(company.logo.url) if company.logo else None,
                        "industry": company.industry,
                        "description": company.description,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
