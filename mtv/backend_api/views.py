from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets, status
from .models import (
    Product, Category,
    Brand, 
    CartProduct, 
    Partner, Comment,
    Staff, Order
)
from .serializer import (
    ProductSerializer,
    CategorySerializer,
    PartnerSerializer,
    CategoryDetailSerializer,
    ProductDetailSerializer,
    # CustomerSerializer,
    CartProductSerializer,
    OrderSerializer,
    # CartSerializer
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

    
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CartProductViewSet(viewsets.ModelViewSet):
    queryset = CartProduct.objects.all()
    serializer_class = CartProductSerializer
    http_method_names = ['post', 'get', 'delete', 'put']

    def create(self, request, *args, **kwargs):
        data = request.data

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

