from django.contrib import admin

from .models import Menu


# Register your models here.
class MenuAdmin(admin.ModelAdmin):
    list_display = ('categoryName',)
    


    '''10 items per page'''
    list_per_page = 10
    
admin.site.register(Menu, MenuAdmin)