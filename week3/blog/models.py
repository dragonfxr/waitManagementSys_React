from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class Menu(models.Model):       
    categoryName = models.CharField(verbose_name=_('categoryName (*)'), max_length=50, db_index=True)

    def __str__(self):
        return self.categoryName

    class Meta:
        ordering = ['-categoryName']
        verbose_name = "Menu"
        verbose_name_plural = "Menus"

