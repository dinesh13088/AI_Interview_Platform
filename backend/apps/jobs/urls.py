
from django.urls import path
from .views import JobView,GetJobView


from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    
    path("api/register/",view=JobView.as_view(),name="job-create"),
    path("api/getjobs/",view=GetJobView.as_view(),name="job-get"),

    
]
urlpatterns=format_suffix_patterns(urlpatterns)