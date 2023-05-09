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
    CategoryDetailSerializer
)
from rest_framework.response import Response

# class ProductView(APIView):
#     def get(self, request):
#         output = [
#             {
#                 "title": output.title,
#                 "price": output.price
#             } for output in Product.objects.all()
#         ]
#         return Response(output)
#
#     def post(self, request):
#         serializer = ProductSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
#
#
# class CategoryView(APIView):
#     def get(self, request):
#         output = [
#             {
#                 "name": output.name,
#                 "targeted": output.targeted,
#                 "slug": output.slug,
#             } for output in Category.objects.all()
#         ]
#         return Response(output)

# def category_detail(request, id):
#     return render(request, 'index.html', {})

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


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
