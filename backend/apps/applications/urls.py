from django.urls import path
from ..applications.views import (
    ApplyToJobView, MyApplicationsView, MyApplicationDetailView,
    JobApplicantsView, ApplicantDetailView, UpdateApplicationStatusView,
)

urlpatterns = [
    path('apply/', ApplyToJobView.as_view()),
    path('my/', MyApplicationsView.as_view()),
    path('my/<int:application_id>/', MyApplicationDetailView.as_view()),
    path('jobs/<int:job_id>/applicants/', JobApplicantsView.as_view()),
    path('applicants/<int:application_id>/', ApplicantDetailView.as_view()),
    path('applicants/<int:application_id>/status/', UpdateApplicationStatusView.as_view()),
]