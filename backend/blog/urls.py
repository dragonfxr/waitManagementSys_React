from django.urls import re_path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    re_path(r'^menus/$', views.menu_list),
    re_path(r'^menus/(?P<pk>[0-9]+)$', views.menu_detail),
    re_path(r'^orders/$', views.order_list),
    re_path(r'^orders/(?P<pk>[0-9]+)$', views.order_detail)]

urlpatterns = format_suffix_patterns(urlpatterns)