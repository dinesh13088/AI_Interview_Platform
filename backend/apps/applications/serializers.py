from rest_framework import serializers
from .models import Application, JobMatchAnalysis
from ..candidates.models import CandidateProfile


class CandidateMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateProfile
        fields = ['first_name', 'last_name', 'phone_number', 'picture']


class ApplicationCreateSerializer(serializers.ModelSerializer):
    resume = serializers.FileField(required=False)

    class Meta:
        model = Application
        fields = ['job', 'resume']

    def validate(self, attrs):
        request = self.context['request']
        job = attrs['job']
        

        profile = request.user.canidates_profile   # or request.user.candidate_profile
        if Application.objects.filter(candidate=profile, job=job).exists():
            raise serializers.ValidationError({"job": "You have already applied to this job."})

        if 'resume' not in attrs:
            profile = getattr(request.user, 'candidates_profile', None)  # match your actual related_name
            if not profile or not profile.upload_cv:
                raise serializers.ValidationError(
                    {"resume": "No resume uploaded, and you have no saved resume on your profile."}
                )
            attrs['resume'] = profile.upload_cv

        return attrs

    def create(self, validated_data):
        validated_data['candidate'] = self.context['request'].user.canidates_profile
        return Application.objects.create(**validated_data)


class ApplicationListSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    company_name = serializers.CharField(source='job.company.name', read_only=True)
    candidate_first_name = serializers.CharField(source='candidate.candidates_profile.first_name', read_only=True)
    candidate_last_name = serializers.CharField(source='candidate.candidates_profile.last_name', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id', 'status', 'applied_at',
            'job', 'job_title', 'company_name',
            'candidate_id', 'candidate_first_name', 'candidate_last_name', 'resume',
        ]
        read_only_fields = fields


class JobMatchAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobMatchAnalysis
        fields = ['matched_skills', 'missing_skills', 'experience_summary', 'match_percentage', 'created_at']
        read_only_fields = fields


class ApplicationDetailSerializer(serializers.ModelSerializer):
    candidate = CandidateMiniSerializer(source='candidate.candidates_profile', read_only=True)
    candidate_email = serializers.EmailField(source='candidate.email', read_only=True)
    job_title = serializers.CharField(source='job.title', read_only=True)
    match_analysis = serializers.SerializerMethodField()
    interview = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = [
            'id', 'status', 'applied_at',
            'job', 'job_title',
            'candidate', 'candidate_email', 'resume',
            'match_analysis', 'interview',
        ]
        read_only_fields = fields

    def get_match_analysis(self, obj):
        analysis = getattr(obj, 'match_analysis', None)
        return JobMatchAnalysisSerializer(analysis).data if analysis else None

    def get_interview(self, obj):
        from ..interview.serializers import InterviewSerializer
        interview = getattr(obj, 'interview', None)
        return InterviewSerializer(interview).data if interview else None


class ApplicationStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']