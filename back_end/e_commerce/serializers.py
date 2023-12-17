from django.db.models import Sum
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import User, Items, Categories, Ratings, Comments, Up_votes, WishList, Cart

class User_serializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'bio', 'items_count', 'cash', 'is_verified']

class Items_serializers(ModelSerializer):
    user = User_serializer(read_only=True)
    in_stock = serializers.BooleanField(read_only=True)
    class Meta:
        model = Items
        fields = '__all__'


class Categories_serializers(ModelSerializer):
    user = User_serializer(read_only=True, many=True)
    item = Items_serializers(read_only=True, many=True)
    class Meta:
        model = Categories
        fields = '__all__'

class Ratings_serializers(ModelSerializer):
    user = User_serializer(read_only=True)
    item = Items_serializers(read_only=True)
    class Meta:
        model = Ratings
        fields = '__all__'

class Comments_serializers(ModelSerializer):
    user = User_serializer(read_only=True)
    item = Items_serializers(read_only=True)
    class Meta:
        model = Comments
        fields = '__all__'

class Up_votes_serializers(ModelSerializer):
    user = User_serializer(read_only=True)
    Comment = Comments_serializers(read_only=True)
    class Meta:
        model = Up_votes
        fields = '__all__'

class WishList_serializers(ModelSerializer):
    user = User_serializer(read_only=True)
    items = Items_serializers(read_only=True, many=True)
    price = serializers.SerializerMethodField(method_name='calculate_price')
    count = serializers.SerializerMethodField(method_name='items_count')
    class Meta:
        model = WishList
        fields = '__all__'

    def calculate_price(self, product:WishList):
        total_price = product.items.aggregate(total_price=Sum('price'))['total_price']
        return total_price or 0

    def items_count(self, product:WishList):
        return product.items.all().count()

class Cart_serializers(ModelSerializer):
    user = User_serializer(read_only=True)
    items = Items_serializers(read_only=True, many=True)
    price = serializers.SerializerMethodField(method_name='calculate_price')
    count = serializers.SerializerMethodField(method_name='items_count')
    class Meta:
        model = Cart
        fields = '__all__'

    def calculate_price(self, product:Cart):
        total_price = product.items.aggregate(total_price=Sum('price'))['total_price']
        return total_price or 0

    def items_count(self, product:Cart):
        return product.items.all().count()