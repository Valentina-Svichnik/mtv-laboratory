"""
URL configuration for mtv project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.urls import re_path as url
from backend_api.views import *
from django.conf.urls.static import static
from django.conf import settings

from rest_framework import routers

router = routers.SimpleRouter()
router.register('category', CategoryViewSet, basename='category')
router.register('partner', PartnerViewSet, basename='partner')
router.register('product', ProductViewSet, basename='product')

urlpatterns = [
    path('admin/', admin.site.urls),
#     path('category/<str:slug>/', category_detail)
#     path('', CategoryView.as_view(), name='category'),
#     path('', ProductView.as_view(), name='product'),
]
urlpatterns += router.urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
