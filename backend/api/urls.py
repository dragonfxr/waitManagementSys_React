from django.urls import re_path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    re_path(r'^categories/$', views.CategoryList.as_view()),
    re_path(r'^categories/(?P<pk>[0-9]+)$', views.CategoryDetail.as_view()),
    re_path(r'^dishes/$', views.DishList.as_view()),
    re_path(r'^dishes/(?P<pk>[0-9]+)$', views.DishDetail.as_view()),
    re_path(r'^select/(?P<pk>[0-9]+)$', views.FilterDish.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

