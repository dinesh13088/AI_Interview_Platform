from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import RecruiterSerializer, RecruiterLoginSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken



class RecruiterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = RecruiterSerializer(data=request.data)
        if serializer.is_valid():
            recruiter = serializer.save(account=request.user)
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
                    "company": {
                        "id": company.id,
                        "name": company.name,
                        "website": company.website,
                        "logo": str(company.logo.url) if company.logo else None,
                        "industry": company.industry,
                        "description":company.description
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginRecruiterView(APIView):
    permission_classes = [AllowAny]  

    def post(self, request):
        serializer = RecruiterLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data.get("user")
            recruiter = serializer.validated_data.get("recruiter")
            company = serializer.validated_data.get("company")

           
            refresh = RefreshToken.for_user(user)

            response_data = {
                "message": "User logged in successfully",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "role": user.role,
                    
                },
                "recruiter": {
                    "id": recruiter.id,
                    "first_name": recruiter.first_name,
                    "last_name": recruiter.last_name,
                    "job_title": recruiter.job_title,
                    "phone_number": recruiter.phone_number,
                    "linkedin_url": recruiter.linkedin_url,
                   
                },
                "company": {
                    "id": company.id,
                    "name": company.name,
                    "website": company.website,
                    "logo": str(company.logo.url) if company.logo else None,
                    "industry": company.industry,
                    "description":company.description
                    
                }
            }

            return Response(response_data, status=status.HTTP_200_OK)
        
        return Response(
            {
                "message": "Login failed",
                "errors": serializer.errors
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )