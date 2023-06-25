from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class Category(models.Model):
    CategoryID = models.IntegerField(primary_key=True)
    CategoryName = models.CharField(max_length=20)

    def __str__(self):
        return self.CategoryName

class Dish(models.Model):
    DishID = models.AutoField(primary_key=True)
    DishName = models.CharField(max_length=20)
    Price = models.FloatField(default=0)
    Description = models.CharField(max_length=50)
    Ingredients = models.CharField(max_length=50)
    DishType = models.ForeignKey(
        'Category', to_field="CategoryID", on_delete=models.PROTECT)
    
    def __str__(self):
        return self.DishName

class OrderDish(models.Model):
    OrderDishID = models.AutoField(primary_key=True)
    OrderForeignID = models.ForeignKey('Order',to_field="OrderID",on_delete=models.CASCADE)
    DishForeignID = models.ForeignKey('Dish',to_field="DishID",on_delete=models.DO_NOTHING)
    DishAmount = models.IntegerField(default=1)
    DishPrice = models.FloatField(default=0)

    def __str__(self):
        return "Order Dish Id:" + str(self.OrderDishID)


class Order(models.Model):
    OrderID = models.AutoField(primary_key=True)
    TableID = models.IntegerField(default=0)
    CompleteStatus = models.BooleanField(default=False)
    DishAmount = models.IntegerField(default=0)
    TablePrice = models.FloatField(default=0)

    def __str__(self):
        return 'Order' + str(self.OrderID)

    


    
