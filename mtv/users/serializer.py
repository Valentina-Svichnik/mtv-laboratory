from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers
from .models import  Customer, Cart
from django.contrib.auth import get_user_model
User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('first_name', 'last_name', 'email', 'password')

  def validate(self, data):
    user = User(**data)
    password = data.get('password')

    try:
      validate_password(password, user)
    except exceptions.ValidationError as e:
      serializer_errors = serializers.as_serializer_error(e)
      raise exceptions.ValidationError(
        {'password': serializer_errors['non_field_errors']}
      )

    return data


  def create(self, validated_data):
    user = User.objects.create_user(
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name'],
      email=validated_data['email'],
      password=validated_data['password'],
    )

    return user


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('first_name', 'last_name', 'email',)


class CartSerializer(serializers.ModelSerializer):
  class Meta:
      model = Cart
      fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

# class CartDetailSerializer(serializers.ModelSerializer):
#   cart = serializers.SerializerMethodField()

#   class Meta:
#     model = User
#     fields = '__all__'

#   @staticmethod
#   def get_cart(obj):
#     return  CartSerializer(Cart.objects.filter(owner=obj), many=False).data
