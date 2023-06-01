# Generated by Django 4.2 on 2023-05-30 14:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
        ('backend_api', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartproduct',
            name='cart',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='related_products', to='users.cart', verbose_name='Корзина'),
        ),
        migrations.AddField(
            model_name='order',
            name='cart',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.cart', verbose_name='Корзина'),
        ),
    ]