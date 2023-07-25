from django.urls import re_path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    re_path(r'^categories/$', views.CategoryList.as_view()),
    re_path(r'^categories/(?P<pk>[0-9]+)$', views.CategoryDetail.as_view()),
    re_path(r'^dishes/$', views.DishList.as_view()),
    re_path(r'^dishes/(?P<pk>[0-9]+)$', views.DishDetail.as_view()),
    re_path(r'^items/$', views.OrderDetailList.as_view()),
    re_path(r'^items/(?P<pk>[0-9]+)$', views.OrderDetailDetail.as_view()),
    re_path(r'^orders/$', views.OrderTableList.as_view()),
    re_path(r'^orders/(?P<pk>[0-9]+)$', views.OrderTableDetail.as_view()),
    re_path(r'^tables/$', views.TableList.as_view()),
    re_path(r'^tables/(?P<pk>[0-9]+)$', views.TableDetail.as_view()),
    re_path(r'^update/$', views.UpdateOrder.as_view()),
    re_path(r'^filter_dish/(?P<pk>[0-9]+)$', views.FilterDish.as_view()),
    re_path(r'^filter_order/(?P<pk>[0-9]+)$', views.FilterOrder.as_view()),
    re_path(r'^filter_table/(?P<pk>[0-9]+)$', views.FilterTable.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

