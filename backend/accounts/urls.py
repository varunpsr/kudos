from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
    path('register/', views.create_user, name='user-register'),
    path('logout/', views.logout, name='user-logout'),
    path("users/", views.list_users, name="list-users")
]