from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserRegistrationSerializer, UserListSerializer, UserProfileDetailSerializer
from django.contrib.auth.models import User
from .models import UserProfile, Organization
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


@api_view(['POST', ])
def create_user(request):
    """
    Create user view
    """
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def logout(request):
    if request.method == 'GET':
        try:
            request.user.auth_token.delete()
        except (AttributeError, Exception):
            pass
        return Response(status=status.HTTP_200_OK)

@api_view(['GET',])
@permission_classes([permissions.IsAuthenticated])
def list_users(request):
    user = request.user
    try:
        profile = UserProfile.objects.get(user = user)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    organization = profile.organization
    profiles = UserProfile.objects.filter(organization=organization).exclude(user=user)
    serializer = UserProfileDetailSerializer(profiles, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        profile = UserProfile.objects.get(user=user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': profile.pk,
            'email': user.email,
            'name': user.get_full_name(),
            'organization_name': profile.organization.name
        })
