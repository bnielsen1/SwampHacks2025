from django.urls import path

from . import views

urlpatterns = [
    path("sessions/", views.sessions),
    path('sessions/course/<str:coursecode>/', views.session_course),
    path('sessions/library/<str:library>/', views.session_library),
    path('users', views.users),
    path('UFdata',views.UFdata),
    path('public', views.public),
    path('private', views.private),
    path('courses', views.courses),
    path('courses/<str:search>/', views.search_courses),
    path('libraries', views.search_library),
    path('send-email', views.send_email),
    path('add-user', views.add_user),
    path('create-session/', views.create_session, name='create_session'),
]

