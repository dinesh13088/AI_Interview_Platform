from django.http import HttpResponse

def home(request):
    return HttpResponse("hello from 8000")