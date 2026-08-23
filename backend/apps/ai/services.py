import json
import os
from openai import OpenAI
from django.conf import settings
client = OpenAI(api_key=settings.OPENAI_API_KEY)
MODEL = "gpt-4o-mini"  # swap for whichever model/provider you're using


def _call_llm_json(prompt: str) -> dict:
    """
    Shared helper: calls the LLM and safely parses JSON output.
    Centralizing this means every function below gets the same
    error handling for free instead of duplicating try/except logic.
    """
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are an assistant that ONLY responds with valid JSON. No markdown, no explanation, no code fences."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.4,
    )
    raw = response.choices[0].message.content.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # fallback: strip accidental markdown code fences if the model adds them anyway
        cleaned = raw.replace("```json", "").replace("```", "").strip()
        try:
            return json.loads(cleaned)
        except json.JSONDecodeError:
            # last resort: return a safe empty structure instead of crashing the request
            return {}


def generate_interview_questions(job_description: str, resume_context: str, num_questions: int = 5) -> list[str]:
    """
    Job Description + Resume -> Interview Questions
    Used by: interviews.views.StartInterviewView
    """
    prompt = f"""
Based on the job description and candidate background below, generate {num_questions} interview questions
that assess the candidate's fit for this specific role. Mix technical and situational questions.

Job Description:
{job_description}

Candidate Background:
{resume_context}

Respond ONLY with JSON in this exact format, nothing else:
{{"questions": ["question 1", "question 2", "question 3"]}}
"""
    data = _call_llm_json(prompt)
    questions = data.get("questions", [])

    # safety net: if the AI call fails or returns nothing, don't leave the interview with zero questions
    if not questions:
        questions = [
            "Tell me about your relevant experience for this role.",
            "Describe a challenging technical problem you've solved.",
            "Why are you interested in this position?",
        ]
    return questions


def evaluate_answer(question_text: str, answer_text: str) -> dict:
    """
    Question + Candidate Answer -> Score + Feedback
    Used by: interviews.views.SubmitAnswerView
    """
    prompt = f"""
Evaluate this candidate's interview answer.

Question: {question_text}
Answer: {answer_text}

Score the answer from 0 to 10 based on relevance, clarity, and depth.
Respond ONLY with JSON in this exact format, nothing else:
{{"score": <number 0-10>, "feedback": "<2-3 sentence constructive feedback>"}}
"""
    data = _call_llm_json(prompt)
    return {
        "score": float(data.get("score", 0)),
        "feedback": data.get("feedback", "Unable to generate feedback at this time."),
    }


def analyze_job_match(resume_context: str, job_description: str) -> dict:
    """
    Resume + Job Description -> Skills, Experience, Missing Skills, Job Match %
    Used by: applications.views.JobMatchAnalysisView (if you build this endpoint)
    """
    prompt = f"""
Compare this candidate's background against the job description.

Candidate Background:
{resume_context}

Job Description:
{job_description}

Respond ONLY with JSON in this exact format, nothing else:
{{
  "matched_skills": ["skill1", "skill2"],
  "missing_skills": ["skill3", "skill4"],
  "experience_summary": "<1-2 sentence summary of relevant experience>",
  "match_percentage": <number 0-100>
}}
"""
    data = _call_llm_json(prompt)
    return {
        "matched_skills": data.get("matched_skills", []),
        "missing_skills": data.get("missing_skills", []),
        "experience_summary": data.get("experience_summary", ""),
        "match_percentage": data.get("match_percentage", 0),
    }