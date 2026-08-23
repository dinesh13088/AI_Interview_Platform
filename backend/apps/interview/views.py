from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.conf import settings

from .models import Interview, InterviewQuestion, Answer
from .serializers import (
    InterviewSerializer, ScheduleInterviewSerializer,
    SubmitAnswerSerializer, ReviewInterviewSerializer,
)
from ..applications.models import Application
# from ..applications.permissions import IsRecruiter, IsCandidate
from ..ai.services import generate_interview_questions, evaluate_answer
from rest_framework.permissions import IsAuthenticated

class ScheduleInterviewView(APIView):
    """Recruiter selects candidate + schedules interview -> Interview created."""
    permission_classes = [IsAuthenticated]

    def post(self, request, application_id):
        recruiter_company = request.user.recruiter_profile.company

        application = get_object_or_404(
            Application, id=application_id, job__company=recruiter_company
        )

        serializer = ScheduleInterviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        interview, created = Interview.objects.get_or_create(
            application=application,
            defaults={
                'scheduled_at': serializer.validated_data.get('scheduled_at'),
                'status': 'scheduled',
            }
        )
        if not created:
            return Response(
                {"detail": "An interview already exists for this application."},
                status=status.HTTP_400_BAD_REQUEST
            )

        application.status = 'interview_scheduled'
        application.save()

        return Response(InterviewSerializer(interview).data, status=status.HTTP_201_CREATED)


class StartInterviewView(APIView):
    """Candidate starts interview -> AI generates questions from Job description + resume -> saved."""
    permission_classes = [IsAuthenticated]
    

    def post(self, request, interview_id):
        print(settings.OPENAI_API_KEY)
     
        interview = get_object_or_404(
            Interview, id=interview_id, application__candidate=request.user
        )

        if interview.questions.exists():
            return Response(InterviewSerializer(interview).data)  # already generated, don't duplicate

        job = interview.application.job
        resume_file = interview.application.resume

        print("Job desc:", job.description)
        print("Resume:", resume_file.name if resume_file else "None")

        # NOTE: resume_file is a FileField, not extracted text.
        # For MVP, pass the filename/job description only, or add text extraction (see note below).
        resume_context = resume_file.name if resume_file else ""

        question_texts = generate_interview_questions(job.description, resume_context)

        InterviewQuestion.objects.bulk_create([
            InterviewQuestion(interview=interview, question_text=q, order=i)
            for i, q in enumerate(question_texts)
        ])

        interview.status = 'in_progress'
        interview.started_at = timezone.now()
        interview.save()

        return Response(InterviewSerializer(interview).data)


class SubmitAnswerView(APIView):
    """Candidate answers question -> AI evaluates -> Score + Feedback saved."""
    permission_classes = [IsAuthenticated]

    def post(self, request, interview_id):
        interview = get_object_or_404(
            Interview, id=interview_id, application__candidate=request.user
        )
        serializer = SubmitAnswerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        question = get_object_or_404(
            InterviewQuestion, id=serializer.validated_data['question_id'], interview=interview
        )
        answer_text = serializer.validated_data['answer_text']

        evaluation = evaluate_answer(question.question_text, answer_text)

        Answer.objects.update_or_create(
            question=question,
            defaults={
                'answer_text': answer_text,
                'score': evaluation['score'],
                'ai_feedback': evaluation['feedback'],
            }
        )

        total_questions = interview.questions.count()
        answered = Answer.objects.filter(question__interview=interview).count()

        if answered == total_questions:
            scores = Answer.objects.filter(question__interview=interview).values_list('score', flat=True)
            avg_score = sum(scores) / total_questions
            interview.status = 'completed'
            interview.overall_score = round(avg_score, 2)
            interview.completed_at = timezone.now()
            interview.save()

            interview.application.status = 'interview_completed'
            interview.application.save()

        return Response(InterviewSerializer(interview).data)


class ReviewInterviewView(APIView):
    """Recruiter reviews interview after candidate completes it."""
    permission_classes = [IsAuthenticated]

    def post(self, request, interview_id):
        recruiter_company = request.user.recruiter_profile.company

        interview = get_object_or_404(
            Interview, id=interview_id, application__job__company=recruiter_company
        )

        if interview.status != 'completed':
            return Response(
                {"detail": "Interview must be completed before it can be reviewed."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ReviewInterviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        interview.overall_feedback = serializer.validated_data.get('overall_feedback', interview.overall_feedback)
        interview.status = 'reviewed'
        interview.reviewed_at = timezone.now()
        interview.save()

        interview.application.status = 'reviewed'
        interview.application.save()

        return Response(InterviewSerializer(interview).data)


class InterviewResultView(APIView):
    """Candidate sees results — used for both viewing progress mid-interview and final results."""
    permission_classes = [IsAuthenticated]

    def get(self, request, interview_id):
        interview = get_object_or_404(
            Interview, id=interview_id, application__candidate=request.user
        )
        return Response(InterviewSerializer(interview).data)


class RecruiterInterviewDetailView(APIView):
    """Recruiter viewing one interview's full Q&A before/while reviewing."""
    permission_classes = [IsAuthenticated]

    def get(self, request, interview_id):
        recruiter_company = request.user.recruiter_profile.company

        interview = get_object_or_404(
            Interview.objects.prefetch_related('questions__answer'),
            id=interview_id,
            application__job__company=recruiter_company,
        )
        return Response(InterviewSerializer(interview).data)