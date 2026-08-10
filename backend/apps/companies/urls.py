
from django.urls import path
from .views import RegisterCompany


from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    
    path("api/register/",view=RegisterCompany.as_view(),name="company-create"),
    
]
urlpatterns=format_suffix_patterns(urlpatterns)