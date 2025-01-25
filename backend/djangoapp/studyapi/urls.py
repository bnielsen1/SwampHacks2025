from django.urls import path

from . import views

urlpatterns = [
    path("sessions/", views.sessions),
    path('sessions/course/<str:coursecode>/', views.session_course),
    path('sessions/library/<str:library>/', views.session_library),
]