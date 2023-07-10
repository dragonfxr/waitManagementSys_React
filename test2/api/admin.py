from django.contrib import admin

from .models import Category, Dish, OrderDetail, OrderTable, Table


# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('CategoryName',)
    '''10 items per page'''
    list_per_page = 10

class DishAdmin(admin.ModelAdmin):
    list_display = ('DishName',)
    '''10 items per page'''
    list_per_page = 10

class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ('OrderDetailID',)
    '''10 items per page'''
    list_per_page = 10

class OrderTableAdmin(admin.ModelAdmin):
    list_display = ('OrderID',)
    '''10 items per page'''
    list_per_page = 10

class TableAdmin(admin.ModelAdmin):
    list_display = ('TableID',)
    '''10 items per page'''
    list_per_page = 10
    
admin.site.register(Category, CategoryAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(OrderDetail, OrderDetailAdmin)
admin.site.register(OrderTable, OrderTableAdmin)
admin.site.register(Table, TableAdmin)
