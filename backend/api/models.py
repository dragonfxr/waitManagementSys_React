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
    DishImageURL = models.CharField(max_length=1000, null=True)

    
    def __str__(self):
        return self.DishName

class OrderDetail(models.Model):
    OrderDetailID = models.IntegerField(primary_key=True)
    OrderID = models.ForeignKey('OrderTable',to_field="OrderID",on_delete=models.CASCADE)
    DishID = models.ForeignKey('Dish',to_field="DishID",on_delete=models.CASCADE)
    DishAmount = models.IntegerField(default=1)
    CompleteStatus = models.IntegerField(default=0, choices=((0, 'Not taking the order'), (1, 'Dish completed, waiting for serving'), 
                                        (2, 'Serving completed')))
    

    def __str__(self):
        return "Order Dish Id:" + str(self.OrderDetailID)


class OrderTable(models.Model):
    OrderID = models.AutoField(primary_key=True)
    TableID = models.ForeignKey('Table', to_field="TableID", on_delete=models.CASCADE)
    TotalAmount = models.IntegerField(default=0)
    TotalPrice = models.FloatField(default=0)
    CreateTime = models.DateTimeField(auto_now_add=True)
    PayTime = models.DateField(null=True)
    PayStatus = models.BooleanField(default=False)
    DishList = models.JSONField(default= list)

    def __str__(self):
        return 'Order: ' + str(self.OrderID)


class Table(models.Model):
    TableID = models.IntegerField(primary_key=True)
    CallingWaiter = models.BooleanField(default=False)

    def __str__(self):
        return 'Table: ' + str(self.TableID) 
    




