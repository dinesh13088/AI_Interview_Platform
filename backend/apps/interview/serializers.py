from rest_framework import serializers
from .models import Interview, InterviewQuestion, Answer


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'question', 'answer_text', 'score', 'ai_feedback', 'recruiter_notes', 'submitted_at']
        read_only_fields = ['id', 'score', 'ai_feedback', 'submitted_at']


class InterviewQuestionSerializer(serializers.ModelSerializer):
    answer = AnswerSerializer(read_only=True)  # null until the candidate answers

    class Meta:
        model = InterviewQuestion
        fields = ['id', 'question_text', 'order', 'answer']


class InterviewSerializer(serializers.ModelSerializer):
    questions = InterviewQuestionSerializer(many=True, read_only=True)
    job_title = serializers.CharField(source='application.job.title', read_only=True)
    company_name = serializers.CharField(source='application.job.company.name', read_only=True)
    candidate_first_name = serializers.CharField(source='application.candidate.first_name', read_only=True)
    candidate_last_name = serializers.CharField(source='application.candidate.last_name', read_only=True)

    class Meta:
        model = Interview
        fields = [
            'id', 'application', 'status', 'scheduled_at', 'overall_score',
            'overall_feedback', 'started_at', 'completed_at', 'reviewed_at',
            'questions', 'job_title', 'company_name',
            'candidate_first_name', 'candidate_last_name',
        ]
        read_only_fields = [
            'id', 'overall_score', 'overall_feedback',
            'started_at', 'completed_at', 'reviewed_at',
        ]


class ScheduleInterviewSerializer(serializers.Serializer):
    """Input validation only — not a ModelSerializer since scheduling touches Application.status too."""
    scheduled_at = serializers.DateTimeField(required=False)


class SubmitAnswerSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    answer_text = serializers.CharField(allow_blank=False)

    def validate_answer_text(self, value):
        if not value.strip():
            raise serializers.ValidationError("Answer cannot be empty.")
        return value


class ReviewInterviewSerializer(serializers.Serializer):
    overall_feedback = serializers.CharField(required=False, allow_blank=True)