from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import (
    Product, Category,
    Brand, Customer,
    CartProduct, Cart,
    Partner, Comment,
    Staff, Order
)
from .serializer import (
    ProductSerializer,
    CategorySerializer,
    PartnerSerializer,
    CategoryDetailSerializer,
    ProductDetailSerializer,
    CustomerSerializer
#     CommentSerializer,
)
from rest_framework.response import Response



class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    action_to_serializer = {
        "retrieve": ProductDetailSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get (
            self.action,
            self.serializer_class
        )


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    action_to_serializer = {
        "retrieve": CategoryDetailSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get (
            self.action,
            self.serializer_class
        )


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
