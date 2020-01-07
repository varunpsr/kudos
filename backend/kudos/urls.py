from django.urls import path, include
from . import views

urlpatterns = [
    path("kudos/", views.kudos_list
    , name="list-create-kudos"),
]
