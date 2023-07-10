from django.http import Http404
from django.shortcuts import render
from drf_yasg2.utils import swagger_auto_schema
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Dish, OrderDetail, OrderTable, Table
from .serializers import (CategorySerializer, DishSerializer,
                          OrderDetailSerializer, OrderTableSerializer,
                          TableSerializer)

# ------ Category API ------

class CategoryList(APIView):

    #List all categories, or create a new category

    @swagger_auto_schema(
    operation_summary = 'Get all the category list',
    )
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
    operation_summary = 'Add a category to the categoty list',
    operation_description = 'You need to post data in the right format',
    request_body = CategorySerializer,
    responses = {201: CategorySerializer()}
    )
    def post(self, request, format=None):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetail(APIView):

   # Retrieve, update or delete a category

    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404
    @swagger_auto_schema(
    operation_summary = 'Input a categoryID, then you will get a category',
    )
    def get(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    @swagger_auto_schema(
    operation_summary = 'Input a category then update it',
    operation_description = 'Remember the right format',
    request_body = CategorySerializer,
    responses = {201: CategorySerializer()}
    )
    def put(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = CategorySerializer(instance=category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @swagger_auto_schema(
    operation_summary = 'Input a categoryID, then delete it',
    )
    def delete(self, request, pk, format=None):
        category = self.get_object(pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ------ Dish API ------

class DishList(APIView):

    #List all dishes, or create a new dish

    @swagger_auto_schema(
    operation_summary = 'Get all the dish list',
    )
    def get(self, request, format=None):
        dishes = Dish.objects.all()
        serializer = DishSerializer(dishes, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
    operation_summary = 'Add a dish to the dish list',
    operation_description = 'ou need to post data in the right forma',
    request_body = DishSerializer,
    responses = {201: DishSerializer()}
    )
    def post(self, request, format=None):
        serializer = DishSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DishDetail(APIView):

   # Retrieve, update or delete a dish


    def get_object(self, pk):
        try:
            return Dish.objects.get(pk=pk)
        except Dish.DoesNotExist:
            raise Http404
    
    @swagger_auto_schema(
    operation_summary = 'Input a DishID, then you will get a dish',
    )
    def get(self, request, pk, format=None):
        dish = self.get_object(pk)
        serializer = DishSerializer(dish)
        return Response(serializer.data)

    @swagger_auto_schema(
    operation_summary = 'Update a category',
    operation_description = 'Remember the right format',
    request_body = DishSerializer,
    responses = {201: DishSerializer()}
    )
    def put(self, request, pk, format=None):
        dish = self.get_object(pk)
        serializer = DishSerializer(instance=dish, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @swagger_auto_schema(
    operation_summary = 'Input a DishID, then delete it',
    )
    def delete(self, request, pk, format=None):
        dish = self.get_object(pk)
        dish.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ------ Filter Dish -----

class FilterDish(APIView):

    def get_object_category(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404    
    @swagger_auto_schema(
    operation_summary = 'Select all the dishes with same category',
    operation_description = 'Input a categoryID, then get all the dishes in this category'
    )
    def get(self, request, pk, format=None):
        category = self.get_object_category(pk)
        dishes = Dish.objects.filter(DishType = category.CategoryID)
        serializer = DishSerializer(dishes, many=True)
        return Response(serializer.data)



# ------ OrderDetail API ------

class OrderDetailList(APIView):

    #List all order items, or create a new order item

    @swagger_auto_schema(
    operation_summary = 'Get all the order items list',
    )
    def get(self, request, format=None):
        orderdetails = OrderDetail.objects.all()
        serializer = OrderDetailSerializer(orderdetails, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
    operation_summary = 'Add a order item to the order item list',
    operation_description = 'You need to post data in the right format',
    request_body = OrderDetailSerializer,
    responses = {201: OrderDetailSerializer()}
    )
    def post(self, request, format=None):
        serializer = OrderDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailDetail(APIView):

   # Retrieve, update or delete a order detail

    def get_object(self, pk):
        try:
            return OrderDetail.objects.get(pk=pk)
        except OrderDetail.DoesNotExist:
            raise Http404
    @swagger_auto_schema(
    operation_summary = 'Input a OrderItemID, then you will get a order detail',
    )
    def get(self, request, pk, format=None):       
        orderdetail = self.get_object(pk)
        serializer = OrderDetailSerializer(orderdetail)
        return Response(serializer.data)

    @swagger_auto_schema(
    operation_summary = 'Input a order item then update it',
    operation_description = 'Remember the right format',
    request_body = OrderDetailSerializer,
    responses = {201: OrderDetailSerializer()}
    )
    def put(self, request, pk, format=None):
        orderdetail = self.get_object(pk)
        serializer = OrderDetailSerializer(instance=orderdetail, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @swagger_auto_schema(
    operation_summary = 'Input a OrderItemID, then delete it',
    )
    def delete(self, request, pk, format=None):
        orderdetail = self.get_object(pk)
        orderdetail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)