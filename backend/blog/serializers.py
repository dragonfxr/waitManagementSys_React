from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Menu

User = get_user_model()

class MenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = Menu
        fields = '__all__'
        read_only_fields = ('id', )