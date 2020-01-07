from rest_framework import serializers
from .models import Kudos
from django.contrib.auth.models import User

class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class KudosListSerializer(serializers.ModelSerializer):

    from_user = UserListSerializer()
    to_user = UserListSerializer()

    class Meta:
        model = Kudos
        fields = ('id', 'body', 'from_user', 'to_user', 'created_date')

class KudosCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Kudos
        fields = ('id', 'body', 'from_user', 'to_user', 'created_date')