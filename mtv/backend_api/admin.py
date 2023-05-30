from django.contrib import admin
from .models import Product, Category, Brand, Customer, CartProduct, Partner, Comment, Staff, Order

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Customer)
admin.site.register(CartProduct)
# admin.site.register(Cart)
admin.site.register(Partner)
admin.site.register(Comment)
admin.site.register(Staff)
admin.site.register(Order)