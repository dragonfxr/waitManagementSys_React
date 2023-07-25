from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Category, Dish, OrderDetail, OrderTable, Table

User = get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

 
class OrderDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderDetail
        fields = '__all__'

class OrderTableSerializer(serializers.ModelSerializer):
    DishList = serializers.JSONField()
    class Meta:
        model = OrderTable
        fields = '__all__'

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'

