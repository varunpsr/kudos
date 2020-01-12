from rest_framework import status
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from .models import Kudos
from .serializers import KudosCreateSerializer, KudosListSerializer
from accounts.models import UserProfile


@api_view(['GET', 'POST', ])
@permission_classes([permissions.IsAuthenticated])
def kudos_list(request):
    """[summary]
    Get list of Kudos or Create a new Kudos
    """
    user = request.user
    try:
        profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        error = {}
        return Response(data="User Profile does not exist.", status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        kudos = Kudos.objects.filter(Q(from_user=profile) | Q(to_user=profile))
        serializer = KudosListSerializer(kudos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        if request.data["from_user"] != profile.id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = KudosCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)