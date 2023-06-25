from django.contrib import admin

from .models import Category, Dish


# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('CategoryName',)
    '''10 items per page'''
    list_per_page = 10

class DishAdmin(admin.ModelAdmin):
    list_display = ('DishName',)
    '''10 items per page'''
    list_per_page = 10
    
admin.site.register(Category, CategoryAdmin)
admin.site.register(Dish, DishAdmin)