
from django.urls import path
from .views import CandidateProfileView,candidate


from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
   
    path("",view=candidate),

    path("api/create/",CandidateProfileView.as_view(),name="candidate-create"),
    
]
urlpatterns=format_suffix_patterns(urlpatterns)