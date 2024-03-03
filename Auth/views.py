from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login
User = get_user_model()
from rest_framework.decorators import permission_classes
from .models import TokenBlacklist
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')

        if password != confirm_password:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(
                email=email,
                password=password,
            )
            return Response({'success': 'User created successfully', 'email': user.email}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            tokens = get_tokens_for_user(user)
            return Response({'success': 'Login successful', 'tokens': tokens}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class LogoutView(APIView):
    def post(self, request):
        token = request.data.get('token')
        if token:
            TokenBlacklist.objects.create(token=token)
            return Response({'message': 'Successfully logged out'})
        else:
            return Response({'error': 'Token is required'}, status=400)
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUser(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)