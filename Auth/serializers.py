from rest_framework import serializers
from .models import TokenBlacklist , CustomUser

class TokenBlacklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenBlacklist
        fields = ['token', 'blacklisted_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [ 'email'] 