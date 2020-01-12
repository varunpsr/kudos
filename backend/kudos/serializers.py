from rest_framework import serializers
from .models import Kudos
from accounts.serializers import UserProfileDetailSerializer
from django.contrib.auth.models import User


class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class KudosListSerializer(serializers.ModelSerializer):

    from_user = UserProfileDetailSerializer()
    to_user = UserProfileDetailSerializer()

    class Meta:
        model = Kudos
        fields = ('id', 'body', 'from_user', 'to_user', 'created_date')


class KudosCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Kudos
        fields = ('body', 'from_user', 'to_user')

    def validate(self, attrs):
        instance = Kudos(**attrs)
        instance.clean()
        return attrs
