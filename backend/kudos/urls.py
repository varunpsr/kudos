from django.urls import path, include
from . import views

urlpatterns = [
    path("kudos/", views.kudos_list, name="list-create-kudos"),
    path('kudos/received', views.kudos_received_list, name="list-received-kudos"),
]
