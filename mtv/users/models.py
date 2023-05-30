from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class UserAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, password=None):
        user = self.create_user(
            first_name,
            last_name,
            email,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email

    def save(self,*args,**kwargs):
        created = not self.pk
        super().save(*args,**kwargs)
        if created:
            Customer.objects.create(
                user=self,
                first_name=self.first_name,
                last_name=self.last_name,
                email=self.email,
                password=self.password
            )
            # Cart.objects.create(owner=self)

    class Meta:
        verbose_name = 'Учетная запись пользователя'
        verbose_name_plural = 'Учетные записи пользователей'


class Customer(models.Model):
    GENDER_MAN = 'м'
    GENDER_WOMAN = 'ж'

    GENDER_CHOICES = (
        (GENDER_MAN, 'Мужской'),
        (GENDER_WOMAN, 'Женский')
    )
    user = models.OneToOneField(UserAccount, verbose_name='Пользователь', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, verbose_name='Имя', blank=True)
    last_name = models.CharField(max_length=255, verbose_name='Фамилия', blank=True)
    email = models.CharField(max_length=255, verbose_name='Почта', blank=True)
    password = models.CharField(max_length=45, verbose_name='Пароль', blank=True)
    phone = models.CharField(max_length=16, verbose_name='Номер телефона', blank=True)
    address = models.CharField(max_length=255, verbose_name='Адрес', blank=True)
    # birthday = models.DateField(verbose_name='Дата рождения', blank=True)
    gender = models.CharField(max_length=1, verbose_name='Пол', choices=GENDER_CHOICES, default=GENDER_MAN, blank=True)
    registered = models.BooleanField(default=True)

    def __str__(self):
        return self.email

    def save(self,*args,**kwargs):
        created = not self.pk
        super().save(*args,**kwargs)
        if created:
            Cart.objects.create(owner=self)

    class Meta:
        verbose_name = "Клиент"
        verbose_name_plural = "Клиенты"


class Cart(models.Model):
    owner = models.OneToOneField(Customer, null=True, verbose_name='Владелец', on_delete=models.CASCADE)
    in_order = models.BooleanField(default=False)
    for_anonymous_user = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = "Корзина"
        verbose_name_plural = "Корзина"



