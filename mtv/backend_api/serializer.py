from rest_framework import serializers
from .models import Product, Category, Brand, CartProduct,  Partner, Comment, Staff, Order

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

# class CustomerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Customer
#         fields = '__all__'

class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = '__all__'

    def create(self, validated_data):
        cartProduct = CartProduct.objects.create(
            owner=validated_data['owner'],
            cart=validated_data['cart'],
            qty=validated_data['qty'],
            product=validated_data['product'],
            final_price=validated_data['final_price'],
        )

        return cartProduct


# class CartSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cart
#         fields = '__all__'

#     def create(self, validated_data):
#         cart = Cart.objects.create_cart(
#             owner=validated_data['owner'],
#             products=validated_data['products'],
#             total_products=validated_data['total_products'],
#             in_order=validated_data['in_order'],
#             for_anonymous_user=validated_data['for_anonymous_user'],
#         )

#         return cart