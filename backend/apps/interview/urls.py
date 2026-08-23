from django.urls import path
from .views import (
    ScheduleInterviewView, StartInterviewView, SubmitAnswerView,
    ReviewInterviewView, InterviewResultView, RecruiterInterviewDetailView,
)

urlpatterns = [
    path('applications/<int:application_id>/schedule/', ScheduleInterviewView.as_view()),
    path('<int:interview_id>/start/', StartInterviewView.as_view()),
    path('<int:interview_id>/answer/', SubmitAnswerView.as_view()),
    path('<int:interview_id>/review/', ReviewInterviewView.as_view()),
    path('<int:interview_id>/results/', InterviewResultView.as_view()),
    path('<int:interview_id>/recruiter-view/', RecruiterInterviewDetailView.as_view()),
]