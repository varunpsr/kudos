from rest_framework import status
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from .models import Kudos
from .serializers import KudosCreateSerializer, KudosListSerializer


@api_view(['GET', 'POST', ])
@permission_classes([permissions.IsAuthenticated])
def kudos_list(request):
    """[summary]
    Get list of Kudos or Create a new Kudos
    """
    user = request.user
    if request.method == 'GET':
        kudos = Kudos.objects.filter(Q(from_user=user) | Q(to_user=user))
        serializer = KudosListSerializer(kudos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        if request.data["from_user"] != user.id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = KudosCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)