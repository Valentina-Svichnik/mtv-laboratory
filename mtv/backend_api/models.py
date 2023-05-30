import json
from django.db import models
from django.contrib.auth import get_user_model
from users.models import Cart, Customer

# User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name='Имя категории')
    targeted = models.BooleanField(default=False)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

    class Meta:
#         ordering = ('name',)
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

#     def get_absolute_url(self):
#                     return reverse('shop:product_list_by_category', args=[self.slug])
#
#     @property
#     def products(self):
#         return json.dumps(Product.objects.filter(category=self).values())


class Brand (models.Model):
  brand_name = models.CharField(max_length=255, verbose_name='Название бренда')
  image = models.ImageField(verbose_name='Изображение', null=True)

  def __str__(self):
      return self.brand_name

  class Meta:
      verbose_name = "Бренд"
      verbose_name_plural = "Бренды"


class Product(models.Model):
    category = models.ForeignKey(Category, verbose_name='Категория', on_delete=models.CASCADE, null=True)
    brand = models.ForeignKey(Brand, verbose_name='Бренд', on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255, verbose_name='Наименование')
    slug = models.SlugField(unique=True, null=True)
    image = models.ImageField(verbose_name='Изображение', null=True)
    description = models.TextField(verbose_name='Описание', null=True)
    composition = models.TextField(verbose_name='Характеристики', null=True)
    price = models.DecimalField(max_digits=15, decimal_places=2, verbose_name='Цена')
    weight = models.IntegerField(verbose_name='Вес одной единицы', null=True)
    created = models.DateTimeField(auto_now_add=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    is_new = models.BooleanField(default=True)
    sale = models.IntegerField(verbose_name='Скидка', null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


# class Customer(models.Model):
#     GENDER_MAN = 'м'
#     GENDER_WOMAN = 'ж'

#     GENDER_CHOICES = (
#         (GENDER_MAN, 'Мужской'),
#         (GENDER_WOMAN, 'Женский')
#     )

#     first_name = models.CharField(max_length=255, verbose_name='Имя')
#     last_name = models.CharField(max_length=255, verbose_name='Фамилия')
#     login = models.CharField(max_length=45, verbose_name='Логин')
#     password = models.CharField(max_length=45, verbose_name='Пароль')
#     email = models.CharField(max_length=255, verbose_name='Почта')
#     phone = models.CharField(max_length=16, verbose_name='Номер телефона', null=True, blank=True)
#     address = models.CharField(max_length=255, verbose_name='Адрес', null=True, blank=True)
#     birthday = models.DateField(verbose_name='Дата рождения')
#     gender = models.CharField(max_length=1, verbose_name='Пол', choices=GENDER_CHOICES, default=GENDER_MAN)
#     registered = models.BooleanField()

#     def __str__(self):
#         return self.login

#     class Meta:
#         verbose_name = "Клиент"
#         verbose_name_plural = "Клиенты"

#     def __str__(self):
#         if not (self.user.first_name and self.user.last_name):
#             return self.user.username
#         return "Покупатель: {} {}".format(self.user.first_name, self.user.last_name)


class CartProduct(models.Model):
    # user = models.ForeignKey('Customer', verbose_name='Покупатель', on_delete=models.CASCADE)
    owner = models.ForeignKey(Customer, verbose_name='Покупатель', on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, verbose_name='Корзина', on_delete=models.CASCADE, related_name='related_products', blank=True, null=True)
    qty = models.PositiveIntegerField(default=1, verbose_name='Количество товара')
    product = models.ForeignKey(Product, verbose_name='Товар', on_delete=models.CASCADE)
    final_price = models.DecimalField(max_digits=15, decimal_places=2, verbose_name='Общая цена')

    def __str__(self):
        return "Продукт: {} (для корзины)".format(self.product.title)

    class Meta:
        verbose_name = "Товар в корзине"
        verbose_name_plural = "Товары в корзине"

    # def save(self, *args, **kwargs):
    #     self.final_price = self.qty * self.product.price * (100 - self.product.sale) * 0.01
    #     super().save(*args, **kwargs)

    # def create_cartProduct(self, user, cart, qty, product, final_price):
    #     cartProduct = self.model(
    #         user=user,
    #         cart=cart,
    #         qty=qty,
    #         product=product,
    #         final_price=final_price,
    #     )

    #     cartProduct.save(using=self._db)
    #     return cartProduct


# class Cart(models.Model):
#     # owner = models.ForeignKey('Customer', null=True, verbose_name='Владелец', on_delete=models.CASCADE)
#     owner = models.OneToOneField(UserAccount, null=True, verbose_name='Владелец', on_delete=models.CASCADE)
#     products = models.ManyToManyField(CartProduct, blank=True, related_name='related_cart')
#     total_products = models.PositiveIntegerField(default=0)
#     final_price = models.DecimalField(max_digits=15, default=0, decimal_places=2, verbose_name='Общая цена')
#     in_order = models.BooleanField(default=False)
#     for_anonymous_user = models.BooleanField(default=False)

#     def __str__(self):
#         return str(self.id)

#     class Meta:
#         verbose_name = "Корзина"
#         verbose_name_plural = "Корзина"

#     def save(self, *args, **kwargs):
#         if self.id:
#             self.total_products = self.products.count()
#             self.final_price = sum([cproduct.final_price for cproduct in self.products.all()])
#         super().save(*args, **kwargs)

#     def create_cart(self, owner, products, total_products, in_order, for_anonymous_user):
#         cart = self.model(
#             owner=owner,
#             products=products,
#             total_products=total_products,
#             in_order=in_order,
#             for_anonymous_user=for_anonymous_user,
#         )

#         cart.save(using=self._db)
#         return cart

class Partner (models.Model):
  partner_name = models.CharField(max_length=45, verbose_name='Название компании')
  img = models.ImageField(verbose_name='Логотип')

  def __str__(self):
      return self.partner_name

  class Meta:
      verbose_name = "Партнер"
      verbose_name_plural = "Партнеры"


class Comment (models.Model):
  product = models.ForeignKey(Product, verbose_name='id товара', on_delete=models.CASCADE)
  client = models.ForeignKey(Customer, verbose_name='id клиента', on_delete=models.CASCADE)
  comment = models.TextField('Комментарий')

  def __str__(self):
      return self.id

  class Meta:
      verbose_name = "Комментарий"
      verbose_name_plural = "Комментарии"

class Staff (models.Model):
  staff_name = models.CharField('ФИО сотрудника', max_length=255)
  position = models.CharField('Должность', max_length=45)
  phone = models.CharField('Телефон', max_length=16)
  birthday = models.DateField('Дата рождения')
  login = models.CharField('Логин', max_length=255)
  password = models.CharField('Пароль', max_length=45)

  def __str__(self):
      return self.staff_name

  class Meta:
      verbose_name = "Сотрудник"
      verbose_name_plural = "Сотрудники"


class Order(models.Model):
    STATUS_NEW = 'new'
    STATUS_IN_PROGRESS = 'in_progress'
    STATUS_READY = 'is_ready'
    STATUS_COMPLETED = 'completed'

    BUYING_TYPE_SELF = 'self'
    BUYING_TYPE_DELIVERY = 'delivery'

    STATUS_CHOICES = (
        (STATUS_NEW, 'Новый заказ'),
        (STATUS_IN_PROGRESS, 'Заказ в обработке'),
        (STATUS_READY, 'Заказ готов'),
        (STATUS_COMPLETED, 'Заказ выполнен')
    )

    BUYING_TYPE_CHOICES = (
        (BUYING_TYPE_SELF, 'Самовывоз'),
        (BUYING_TYPE_DELIVERY, 'Доставка')
    )

    customer = models.ForeignKey(Customer, verbose_name='Покупатель', related_name='related_orders', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, verbose_name='Имя')
    last_name = models.CharField(max_length=255, verbose_name='Фамилия')
    phone = models.CharField(max_length=16, verbose_name='Телефон')
    cart = models.ForeignKey(Cart, verbose_name='Корзина', on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=1024, verbose_name='Адрес', null=True, blank=True)
    status = models.CharField(
        max_length=100,
        verbose_name='Статус заказ',
        choices=STATUS_CHOICES,
        default=STATUS_NEW
    )
    buying_type = models.CharField(
        max_length=100,
        verbose_name='Тип заказа',
        choices=BUYING_TYPE_CHOICES,
        default=BUYING_TYPE_SELF
    )
    comment = models.TextField(verbose_name='Комментарий к заказу', null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True, verbose_name='Дата создания заказа')
    order_date = models.DateField(verbose_name='Дата получения заказа')
    delivery_price = models.DecimalField(max_digits=15, default=0, decimal_places=2, verbose_name='Стоимость доставки')
    price = models.DecimalField(max_digits=15, default=0, decimal_places=2, verbose_name='Стоимость заказа')

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def save(self, *args, **kwargs):
        if self.id:
            self.price = self.cart.final_price + self.delivery_price
        super().save(*args, **kwargs)