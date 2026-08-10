
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST,HTTP_200_OK
from rest_framework.permissions import AllowAny
from django.http import HttpResponse

from .serializers import RegisterSerializer,LoginSerializer
def apps(request):
    return HttpResponse("hello from apps ")

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():

            user=serializer.save()
            refresh=RefreshToken.for_user(user=user)
            
            
            return Response(
                {
                    "messsage":"user registered successfully",
                    "user":{
                        "id":user.id,
                        "username":user.username,
                        "email":user.email,
                        "role":user.role
                    },
                    "tokens":{
                        "refresh":str(refresh),
                        "access":str(refresh.access_token)
                    }
                   
                },status=HTTP_201_CREATED
            )
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        serializer=LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
        
        user=serializer.validated_data.get('user')
        candidate=serializer.validated_data.get('candidate')
        picture_url=candidate.picture.url if candidate.picture else None
        cv_url=candidate.upload_cv.url if candidate.upload_cv else None

        refresh=RefreshToken.for_user(user)
        return Response({
                "message":"Login successfully",
                "user":{
                    "id":user.id,
                    "email":user.email,
                    "username":user.username,
                    "role":user.role
                },
                "tokens":{
                    'access':str(refresh.access_token),
                    'refresh':str(refresh)
                },
                "candidate":{
                    'first_name':candidate.first_name,
                    'last_name':candidate.last_name,
                    'phone_number':candidate.phone_number,
                    'linkedin_url':candidate.linkedin_url,
                    'picture_url':picture_url,
                    'cv_url':cv_url
                }



            },status=HTTP_200_OK)

