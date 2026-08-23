from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404

from ..applications.models import Application
from ..applications.serializers import (
    ApplicationCreateSerializer, ApplicationListSerializer,
    ApplicationDetailSerializer, ApplicationStatusUpdateSerializer,
)
from ..recruiter.models import RecruiterProfile
from rest_framework.permissions import IsAuthenticated

# from .permissions import IsRecruiter, IsCandidate


class ApplyToJobView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = ApplicationCreateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        application = serializer.save()
        return Response(ApplicationListSerializer(application).data, status=status.HTTP_201_CREATED)


class MyApplicationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        applications = Application.objects.filter(candidate=request.user.canidates_profile).select_related(
            'job', 'job__company', 'candidate__candidates_profile'
        ).order_by('-applied_at')

        status_filter = request.query_params.get('status')
        if status_filter:
            applications = applications.filter(status=status_filter)

        return Response(ApplicationListSerializer(applications, many=True).data)


class MyApplicationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, application_id):
        application = get_object_or_404(
            Application.objects.select_related('job', 'candidate__account')
                                .prefetch_related('interview__questions__answer'),
            id=application_id, candidate=request.user.canidates_profile
        )
        return Response(ApplicationDetailSerializer(application).data)


class JobApplicantsView(APIView):
    """Applicants for one specific job, scoped to the requesting recruiter's own company."""
    permission_classes = [IsAuthenticated]

    def get(self, request, job_id):
      
        try:
            recruiter_company = request.user.recruiter_profile.company
        except RecruiterProfile.DoesNotExist:
            return Response(
            {"detail": "Recruiter profile not found."},
            status=status.HTTP_403_FORBIDDEN
            )

        applications = Application.objects.filter(
            job_id=job_id,
            job__company=recruiter_company,
        ).select_related('candidate', 'candidate__account').order_by('-applied_at')

        status_filter = request.query_params.get('status')
        if status_filter:
            applications = applications.filter(status=status_filter)

        return Response(ApplicationListSerializer(applications, many=True).data)


class AllApplicantsView(APIView):
    """All applicants across every job posted by the recruiter's company."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        recruiter_company = request.user.recruiter_profile.company

        applications = Application.objects.filter(
            job__company=recruiter_company
        ).select_related('job', 'candidate', 'candidate__candidates_profile').order_by('-applied_at')

        return Response(ApplicationListSerializer(applications, many=True).data)


class ApplicantDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, application_id):
        recruiter_company = request.user.recruiter_profile.company

        application = get_object_or_404(
            Application.objects.select_related('job', 'candidate__account')
                                .prefetch_related('interview__questions__answer'),
            id=application_id,
            job__company=recruiter_company,   # ownership enforced via the query itself
        )
        return Response(ApplicationDetailSerializer(application).data)


class UpdateApplicationStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, application_id):
        recruiter_company = request.user.recruiter_profile.company

        application = get_object_or_404(
            Application, id=application_id, job__company=recruiter_company
        )
        serializer = ApplicationStatusUpdateSerializer(application, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(ApplicationListSerializer(application).data)