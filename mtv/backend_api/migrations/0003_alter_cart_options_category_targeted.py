# Generated by Django 4.2 on 2023-04-14 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0002_brand_cart_category_customer_partner_staff_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cart',
            options={'verbose_name': 'Корзина', 'verbose_name_plural': 'Корзина'},
        ),
        migrations.AddField(
            model_name='category',
            name='targeted',
            field=models.BooleanField(default=False),
        ),
    ]
