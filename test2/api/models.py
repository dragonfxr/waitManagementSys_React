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

    CostTime = models.IntegerField(default=0)
    
    def __str__(self):
        return self.DishName

class OrderDetail(models.Model):
    OrderDetailID = models.AutoField(primary_key=True)
    OrderForeignID = models.ForeignKey('OrderTable',to_field="OrderID",on_delete=models.CASCADE)
    DishForeignID = models.ForeignKey('Dish',to_field="DishID",on_delete=models.PROTECT)
    DishAmount = models.IntegerField(default=1)
    DishPrices = models.FloatField(default=0)
    Comment = models.CharField(max_length=50)
    Start_CookTime = models.TimeField(null=True)
    End_CookTime = models.TimeField(null=True)
    CompleteStatus = models.IntegerField(default=0, choices=((0, 'Not taking the order'), (1, 'Being prepared'), 
                                        (2, 'Waiting for serving'), (3, 'Serving completed')))

    def __str__(self):
        return "Order Dish Id:" + str(self.OrderDetailID)


class OrderTable(models.Model):
    OrderID = models.AutoField(primary_key=True)
    TableID = models.ForeignKey('Table', to_field="TableID", on_delete=models.CASCADE)
    TotalAmoubnt = models.IntegerField(default=0)
    TotalPrice = models.FloatField(default=0)
    CreateTime = models.DateTimeField(auto_now_add=True)
    PayTime = models.DateField(null=True)
    PayStatus = models.BooleanField(default=False)
    DishAmount = models.IntegerField(default=0)
    OrderComment = models.CharField(max_length=50)

    def __str__(self):
        return 'Order: ' + str(self.OrderID)


class Table(models.Model):
    TableID = models.IntegerField(primary_key=True)

    def __str__(self):
        return 'Table: ' + str(self.TableID) 
    


    
