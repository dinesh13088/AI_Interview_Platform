from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CompanySerializer
from rest_framework import status


class RegisterCompany(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request):
        serializers=CompanySerializer(data=request.data)
        if serializers.is_valid():
            company=serializers.save()
            return Response({
                'message':'company created successfully',
                'company':serializers.data
            })
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)




