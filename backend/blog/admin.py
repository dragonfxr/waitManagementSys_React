from django.contrib import admin

from .models import Menu, Order


# Register your models here.
class MenuAdmin(admin.ModelAdmin):
    list_display = ('categoryName',)
    '''10 items per page'''
    list_per_page = 10

class OrderAdmin(admin.ModelAdmin):
    list_display = ('tableNumber',)
    '''10 items per page'''
    list_per_page = 10
    
admin.site.register(Menu, MenuAdmin)
admin.site.register(Order, OrderAdmin)