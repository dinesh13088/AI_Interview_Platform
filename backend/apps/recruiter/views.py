from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import RecruiterSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class RecruiterView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = RecruiterSerializer(data=request.data)
        if serializer.is_valid():
            recruiter = serializer.save()
            company = recruiter.company
            return Response(
                {
                    "message": "recruiter account created successfully",
                    "recruiter": {
                        "first_name": recruiter.first_name,
                        "last_name": recruiter.last_name,
                        "phone_number": recruiter.phone_number,
                        "linkedin_url": recruiter.linkedin_url,
                        "job_title": recruiter.job_title,
                    },
                    'company': {
                        'id': company.id,
                        'name': company.name,
                        'website': company.website,
                        'logo': str(company.logo.url) if company.logo else None,
                        'industry': company.industry,
                    }
                }, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)