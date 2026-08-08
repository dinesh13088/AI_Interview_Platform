from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CandidateSerializer
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST
from django.http import HttpResponse
from rest_framework.permissions import AllowAny,IsAuthenticated
def candidate(request):
    return HttpResponse("hello from candidate")

class CandidateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        serializer=CandidateSerializer(data=request.data)
        if serializer.is_valid():
            candidate=serializer.save(account=request.user)

            return Response(
                {
                'message':'account created successfully',
                'candidate':{
                    'first_name':candidate.first_name,
                    'last_name':candidate.last_name,
                    'phone_number':candidate.phone_number,
                    'linkedin_url':candidate.linkedin_url,
                    'upload_cv':candidate.upload_cv.url if candidate.upload_cv else None,
                    'picture':candidate.picture.url if candidate.picture else None
                

            }},status=HTTP_201_CREATED)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)



