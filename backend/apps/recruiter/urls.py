
from django.urls import path
from .views import RecruiterView,LoginRecruiterView


from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    
    path("api/register/",view=RecruiterView.as_view(),name="recruiter-create"),
    path("api/recruiter-login/",view=LoginRecruiterView.as_view(),name='recruiter-login')
    
]
urlpatterns=format_suffix_patterns(urlpatterns)