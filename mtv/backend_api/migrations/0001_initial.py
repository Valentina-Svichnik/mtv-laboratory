# Generated by Django 4.2 on 2023-04-12 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Наименование')),
                ('price', models.DecimalField(decimal_places=2, max_digits=9, verbose_name='Цена')),
            ],
        ),
    ]