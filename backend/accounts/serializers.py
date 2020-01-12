from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from .models import Organization, UserProfile

class UserRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password']

    def save(self, **kwargs):
        user = User(
            username = self.validated_data['username'])
        if 'email' in self.validated_data:
            user.email = self.validated_data['email']
        if 'first_name' in self.validated_data:
            user.first_name = self.validated_data['first_name']
        if 'last_name' in self.validated_data:
            user.last_name = self.validated_data['last_name']
        user.set_password(self.validated_data['password'])
        user.save()
        return user

class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', )

class OrganizationDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Organization
        fields = ['id', 'name', ]

class UserProfileDetailSerializer(serializers.ModelSerializer):
    organization = OrganizationDetailSerializer()
    user = UserListSerializer()

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'organization', 'full_name', ]