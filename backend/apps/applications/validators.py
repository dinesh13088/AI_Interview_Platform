# applications/validators.py (and update candidates/models.py to import from here too)
import os
from django.core.exceptions import ValidationError

def validate_resume_file(value):
    ext = os.path.splitext(value.name)[1].lower()
    allowed_extensions = ['.pdf', '.doc', '.docx']
    if ext not in allowed_extensions:
        raise ValidationError("Unsupported file type.")
    max_size = 5 * 1024 * 1024
    if value.size > max_size:
        raise ValidationError("File is too large.")