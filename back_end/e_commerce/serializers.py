from django.db.models import Sum
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *

class User_serializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'bio', 'items_count', 'cash', 'is_verified', 'is_staff']


class Categories_serializers(ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'


class Items_serializers(ModelSerializer):
    user = User_serializer(read_only=True)
    in_stock = serializers.BooleanField(read_only=True)
    category = Categories_serializers(read_only=True)
    class Meta:
        model = Items
        fields = '__all__'

class CategoriesWithItemsSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField(method_name='get_items')

    class Meta:
        model = Categories
        fields = ['id', 'name', 'items']

    def get_items(self, obj):
        items = obj.items_set.all()
        response = Items_serializers(items, many=True).data
        return response

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

class Cart_item_serializers(ModelSerializer):
    item = Items_serializers(read_only=True, required=False)
    price = serializers.SerializerMethodField(method_name='calculate_price')
    class Meta:
        model = CartItem
        fields = '__all__'

    def calculate_price(self, item:CartItem):
        return item.item.price * item.quantity

class items_id_quantity(serializers.Serializer):
    items = serializers.ListField()
    quantity = serializers.ListField()
    def validate(self, attrs):
        items = attrs['items']
        quantity = attrs['quantity']

        if items and quantity and len(items) == len(quantity):
            for i in range(len(items)):
                if not int(items[i]):
                    raise serializers.ValidationError('items must be integer ids')

                if not int(quantity[i]) or quantity[i] == 0:
                    raise serializers.ValidationError('quantity is 0 or not integer')
                if Items.objects.filter(id__in=items).exists:
                     return attrs

        raise serializers.ValidationError('invalid data')

class Cart_serializers(ModelSerializer):
    user = User_serializer(read_only=True)
    cart_items = Cart_item_serializers(source='cart_cartitem', many=True)
    price = serializers.SerializerMethodField(method_name='calculate_price')
    count = serializers.SerializerMethodField(method_name='cart_items_count')
    class Meta:
        model = Cart
        fields = '__all__'

    def calculate_price(self, product:Cart):
        total = 0
        for cart_item in product.cart_cartitem.all():
            total += cart_item.quantity * cart_item.item.price

        return total

    def cart_items_count(self, product:Cart):
        return product.cart_cartitem.all().count()

class Order_item_serializers(ModelSerializer):
    item = Items_serializers()
    price = serializers.SerializerMethodField(method_name='calculate_price')
    class Meta:
        model = OrderItem
        fields = '__all__'

    def calculate_price(self, product:OrderItem):
        return product.quantity * product.item.price

class Order_serializers(ModelSerializer):
    user = User_serializer(read_only=True)
    order_items = Order_item_serializers(source='order_orderitem',read_only=True, many=True)
    price = serializers.SerializerMethodField(method_name='calculate_price')
    count = serializers.SerializerMethodField(method_name='order_item_count')
    class Meta:
        model = Order
        fields = '__all__'

    def calculate_price(self, product:Order):
        total = 0
        for order_item in product.order_orderitem.all():
            total += order_item.quantity * order_item.item.price

        return total

    def order_item_count(self, product:Order):
        return product.order_orderitem.all().count()

class UserComplateSerializers(ModelSerializer):
    order = serializers.SerializerMethodField(method_name='get_order')
    cart = serializers.SerializerMethodField(method_name='get_cart')
    class Meta:
        model = User
        fields = ['id', 'username', 'is_verified', 'cash', 'is_staff', 'order', 'cart']

    def get_order(self, obj):
        order = obj.user_order.all()
        serializered_order = Order_serializers(order, many=True).data
        return serializered_order

    def get_cart(self, obj):
        cart = obj.user_cart.all()
        serializered_cart = Cart_serializers(cart, many=True).data
        return serializered_cart


class HomePageSerializers(serializers.Serializer):
    sub_categoies = Categories_serializers(many=True)
    trending_items = Items_serializers(many=True)
    main_categories = Categories_serializers(many=True)
    shoe_categories = Items_serializers(many=True)
    sport_categories = Categories_serializers(many=True)
