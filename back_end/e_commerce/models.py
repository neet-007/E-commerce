from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import MaxValueValidator
from uuid import uuid4
# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if email is None:
            raise ValueError({'error':'email field required'})
        if username is None:
            raise ValueError({'error':'username field is requird'})

        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(email, username, password)

        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True

        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):

    objects = UserManager()

    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    bio = models.CharField(max_length=255, blank=True)
    is_verified = models.BooleanField(default=False)
    items_count = models.IntegerField(default=0)
    cash = models.DecimalField(max_digits=8 ,decimal_places=2, default=0)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    def __str__(self) -> str:
        return f'user:{self.username} cash:{self.cash}'

class Items(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_items')
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now=True)
    in_stock = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f'user:{self.user.username} item name:{self.name} price:{self.price}'

class Categories(models.Model):
    name = models.CharField(max_length=255)
    user = models.ManyToManyField(User)
    item = models.ManyToManyField(Items)

    def __str__(self) -> str:
        return f'category:{self.name}'

class Ratings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_ratings')
    item = models.ForeignKey(Items, on_delete=models.CASCADE, related_name='item_ratings')
    rating = models.IntegerField(validators = [MaxValueValidator(5)], default=0)

class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_comments')
    item = models.ForeignKey(Items, on_delete=models.CASCADE, related_name='user_item')
    comment = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now=True)
    up_votes = models.IntegerField(default=0)

class Up_votes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_up_votes')
    comment = models.ForeignKey(Comments, on_delete=models.CASCADE, related_name='comment_up_votes')

class WishList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_wishlist')
    items = models.ManyToManyField(Items)

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_cart')

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_cartitem')
    item = models.ForeignKey(Items, on_delete=models.CASCADE, related_name='item_cartitem')
    quantity = models.IntegerField(default=0)

class Order(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_order')
    created_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=False)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_orderitem')
    item = models.ForeignKey(Items, on_delete=models.CASCADE, related_name='items_orderitem')
    quantity = models.IntegerField(default=0)

class Verification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_verificatoin')
    token = models.UUIDField(primary_key=True, default=uuid4, editable=False)
