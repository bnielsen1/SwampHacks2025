from django.http import HttpResponse
from rest_framework import permissions, viewsets
from .models import Session
from .serializers import SessionSerializer


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

class SessionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows sessions to be viewed or edited
    """
    queryset = Session.objects.all().order_by('id')
    serializer_class = SessionSerializer

    