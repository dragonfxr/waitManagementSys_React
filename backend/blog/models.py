from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class Menu(models.Model):       
    dishID = models.IntegerField(verbose_name=_('dishID (*)'), db_index=True, primary_key=True)
    categoryName = models.CharField(verbose_name=_('categoryName (*)'), max_length=50, db_index=True)

    def __str__(self):
        return self.categoryName

    class Meta:
        ordering = ['-dishID']
        verbose_name = "Menu"
        verbose_name_plural = "Menus"

class Order(models.Model):       
    tableNumber = models.IntegerField(verbose_name=_('tableNumber (*)'), db_index=True, primary_key=True)
    orderList = models.ManyToManyField(Menu)


    class Meta:
        ordering = ['-tableNumber']
        verbose_name = "Order"
        verbose_name_plural = "Orders"

