from rest_framework import serializers
from .models import Product, Category, Brand, Customer, CartProduct, Cart, Partner, Comment, Staff, Order

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = '__all__'

class CategoryDetailSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    @staticmethod
    def get_products(obj):
        return  ProductSerializer(Product.objects.filter(category=obj), many=True).data

class ProductDetailSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
#     comment = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    @staticmethod
    def get_category(obj):
        return  CategorySerializer(Category.objects.filter(product=obj), many=True).data

#     @staticmethod
#     def get_comment(obj):
#         return  CommentSerializer(Comment.objects.filter(product=obj), many=True).data

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'