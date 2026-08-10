
from django.urls import path
from .views import RecruiterView


from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    
    path("api/register/",view=RecruiterView.as_view(),name="candidate-create"),
    
]
urlpatterns=format_suffix_patterns(urlpatterns)