
from django.urls import path
from .views import LoginView,RegisterView,apps

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework.urlpatterns import format_suffix_patterns



urlpatterns = [
   
    path("",view=apps),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("api/register/",RegisterView.as_view(),name="register"),
    path("api/login/",LoginView.as_view(),name="login")
]
urlpatterns=format_suffix_patterns(urlpatterns)