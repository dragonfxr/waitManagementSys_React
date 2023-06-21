from django.shortcuts import render
from drf_yasg2.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Menu, Order
from .serializers import MenuSerializer, OrderSerializer


@swagger_auto_schema(
    method = 'GET',
    operation_summary = 'Get the menu list',
    operation_description = 'If success return 201\n'
                            'If fail return 400'
)
@swagger_auto_schema(
    method = 'POST',
    operation_summary = 'Add a category to the menu list',
    operation_description = 'If success return 201\n'
                            'If fail return 400',
    request_body = MenuSerializer,
    responses = {201: MenuSerializer()}
)

@api_view(['GET', 'POST'])
def menu_list(request, format = None):
    """
    List all menus, or create a new menu.
    """
    if request.method == 'GET':
        menus = Menu.objects.all()
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MenuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method = 'PUT',
    operation_summary = 'Update a category',
    operation_description = 'If success return 201\n'
                            'If fail return 400',
    request_body = MenuSerializer,
    responses = {201: MenuSerializer()}
)
@api_view(['GET', 'PUT', 'DELETE'])
def menu_detail(request, pk, format = None):
    """
    Retrieve，update or delete a menu instance。"""
    try:
        menu = Menu.objects.get(pk=pk)
    except Menu.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MenuSerializer(menu)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MenuSerializer(menu, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        menu.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



## ------ The following is order list ------
@swagger_auto_schema(
    method = 'GET',
    operation_summary = 'Get the order list',
    operation_description = 'If success return 201\n'
                            'If fail return 400'
)
@swagger_auto_schema(
    method = 'POST',
    operation_summary = 'Add some dishes to the order list',
    operation_description = 'If success return 201\n'
                            'If fail return 400',
    request_body = OrderSerializer,
    responses = {201: OrderSerializer()}
)
@api_view(['GET', 'POST'])
def order_list(request, format = None):
    """
    List all menus, or create a new menu. Primary key is tableNumber
    """
    if request.method == 'GET':
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@swagger_auto_schema(
    method = 'PUT',
    operation_summary = 'Update a order detail',
    operation_description = 'If success return 201\n'
                            'If fail return 400',
    request_body = OrderSerializer,
    responses = {201: OrderSerializer()}
)
@api_view(['GET', 'PUT', 'DELETE'])
def order_detail(request, pk, format = None):
    """
    Retrieve，update or delete a specific order"""
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)