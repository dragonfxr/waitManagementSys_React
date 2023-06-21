from django.contrib.auth import get_user_model
from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers

from .models import Menu, Order

User = get_user_model()

class MenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = Menu
        fields = '__all__'


class OrderSerializer(WritableNestedModelSerializer,serializers.ModelSerializer):
    orderList = MenuSerializer(many=True)
    class Meta:
        model = Order
        fields = '__all__'