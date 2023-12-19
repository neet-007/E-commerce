from django.shortcuts import render
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import AnonymousUser
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie, csrf_exempt
from django.utils.decorators import method_decorator
from django.db import transaction
from .models import *
from .serializers import *
from .utils import *
# Create your views here.
@method_decorator(csrf_protect, name='dispatch')
class signup_view(APIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request):

        data = self.request.data

        if data['email'] and data['username'] and data['password'] and data['re_password']:

            if data['password'] == data['re_password']:

                if User.objects.filter(email=data['email']).exists():
                    return Response({'error':'email already taken'}, status=status.HTTP_400_BAD_REQUEST)

                if len(data['password']) < 8:
                    return Response({'error':'password too short'}, status=status.HTTP_400_BAD_REQUEST)

                User.objects.create_user(email=data['email'], username=data['username'], password=data['password'])

                return Response({'success':'account made'})

            return Response({'error':'passwords dont match'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'invalid data'}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch')
class login_view(APIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        #serialized_data = User_serializer(data=self.request.data)
        #if serialized_data.is_valid():
            print(self.request.data['email'] + self.request.data['password'])
            user = authenticate(request, email=self.request.data['email'], password=self.request.data['password'])
            print(user)
            if user is not None:
                login(request, user)
                return Response({'success':'login successfull'}, status=status.HTTP_200_OK)

            return Response({'error':'no user with these credintails'}, status=status.HTTP_400_BAD_REQUEST)

        #return Response({'error':'invalid data'}, status=status.HTTP_400_BAD_REQUEST)


class logout_view(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, requset, format=None):
        try:
            logout(requset)
            return Response({'message':'logout sucsseful'}, status.HTTP_200_OK)
        except:
            return Response({'error':'something went wrong'}, status.HTTP_500_INTERNAL_SERVER_ERROR)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class getCSRFToken(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response({'message':'csrf token generated'})




class home(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = User_serializer


class items_view(generics.ListCreateAPIView):
    queryset = Items.objects.all()
    serializer_class = Items_serializers

    def post(self, request):
        user = self.request.user
        if user and user is not AnonymousUser:
            data = self.request.data
            if Items_serializers(data=data).is_valid():

                item = Items.objects.create(
                    user=user,
                    name=data['name'],
                    description=data['description'],
                    price=data['price'],
                    in_stock=True
                )

                item.save()
                user.items_count += 1
                user.save()

                return Response(Items_serializers(item).data, status=status.HTTP_201_CREATED)

            return Response({'error':'invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user not identified'})


class user_items_view(generics.ListAPIView):
    serializer_class = Items_serializers

    def get_queryset(self):
        if self.kwargs['pk'] == 'me':
            if self.request.user:
                return Items.objects.filter(user=self.request.user)

            return Items.objects.none()

        return Items.objects.filter(user__id=int(self.kwargs['pk']))


class create_categories_view(generics.ListCreateAPIView):
    serializer_class = Categories_serializers

    def get_queryset(self):
        if self.kwargs['pk'] == 'me':
            return Categories.objects.filter(user=self.request.user)

        return Categories.objects.all()


    def post(self, request):
        user = self.request.user

        if user and user is not AnonymousUser:
            data = self.request.data

            if Categories_serializers(data=data).is_valid():
                category = Categories.objects.create(
                    name=data['name']
                )

                category.user.add(user)


                existing_items = set(map(int, data.get('items', [])))
                if existing_items:
                    existing_objects = Items.objects.filter(id__in=existing_items)
                    existing_ids = set(item.id for item in existing_objects)

                    missing_items = existing_items - existing_ids

                    if missing_items:
                        return Response({'error': 'Items not found: {}'.format(missing_items)}, status=status.HTTP_400_BAD_REQUEST)

                    # Now all items exist in the database, proceed to add them to the category
                    category.item.add(*existing_objects)

                category.save()

                return Response(Categories_serializers(category).data, status=status.HTTP_201_CREATED)

            return Response({'error':'invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authneticated'}, status=status.HTTP_401_UNAUTHORIZED)


class add_item_to_categories_view(generics.RetrieveAPIView, generics.CreateAPIView):
    serializer_class = Categories_serializers

    def get_queryset(self):
        return Categories.objects.filter(id=self.kwargs['pk'])

    def post(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:
            category = Categories.objects.get(id=self.kwargs['pk'])

            if category:
                item = Items.objects.get(id=(self.request.data.get('item')))
                if item:
                    category.item.add(item)
                    category.save()

                    return Response(Categories_serializers(category).data, status=status.HTTP_201_CREATED)

                return Response({'error':'item not found'})

            return Response({'error':'category not found'})

        return Response({'error':'user is not authenticated'})


class add_rating_view(generics.ListCreateAPIView):
    serializer_class = Ratings_serializers

    def get_queryset(self):
        return Ratings.objects.filter(item__id=self.kwargs['pk'])

    def post(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:

            item = Items.objects.get(id=self.kwargs['pk'])

            if not Ratings.objects.filter(user=user, item=item):

                if item:
                    rating = Ratings.objects.create(
                        user=user,
                        item=item,
                        rating=self.request.data['rating']
                    )

                    return Response(Ratings_serializers(rating).data, status=status.HTTP_201_CREATED)

                return Response({'error':'item not found'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'error':'user already rated'})

        return Response({'error':'user is not authenticated'}, status=status.HTTP_400_BAD_REQUEST)


class add_comment_to_post(generics.ListCreateAPIView):
    serializer_class = Comments_serializers

    def get_queryset(self):
        return Comments.objects.filter(item__id=self.kwargs['pk'])

    def post(self, request, *args, **kwargs):
        user = self.request.user

        if user and user is not AnonymousUser:
            item = Items.objects.get(id=self.kwargs['pk'])

            if item:
                serialized_data = Comments_serializers(data=self.request.data)
                if serialized_data.is_valid():
                    comment = Comments.objects.create(
                        user=user,
                        item=item,
                        comment=serialized_data.validated_data.get('comment')
                    )

                    return Response(Comments_serializers(comment).data, status=status.HTTP_201_CREATED)

                return Response({'error':'invalid data'})

            return Response({'error':'item not found'})

        return Response({'error':'user is not authenticated'})


class add_up_vote(generics.ListCreateAPIView):
    serializer_class = Up_votes_serializers

    def get_queryset(self):
        return Up_votes.objects.filter(comment_id=self.kwargs['pk'])

    def post(self, request, *args, **kwargs):
        user = self.request.user

        if user and user is not AnonymousUser:
            comment = Comments.objects.get(id=self.kwargs['pk'])

            if comment and not Up_votes.objects.filter(user=user, comment=comment):
                up_vote = Up_votes.objects.create(
                    user=user,
                    comment=comment
                )

                return Response(Up_votes_serializers(up_vote).data, status=status.HTTP_201_CREATED)

            return Response({'error':'comment not found or user already liked it'})

        return Response({'error':'user is not authenricated'})


class wishlist_view(generics.ListCreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = WishList_serializers

    def get_queryset(self):
        return WishList.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        user = self.request.user

        if user and user is not AnonymousUser and not WishList.objects.filter(user=user).exists():
            data = self.request.data
            wishlist = WishList.objects.create(
                user=user
            )

            return get_item(data, wishlist, WishList_serializers, 'post')

        return Response({'error':'user is not authenticated'})

    def put(self, request, *args, **kwargs):
        user = self.request.user
        return manipulate(user, self.request.data, WishList, WishList_serializers, 'put')

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        return manipulate(user, self.request.data, WishList, WishList_serializers, 'delete')


class Cart_view(generics.ListCreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = Cart_serializers

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        user = self.request.user
        return manipulate2(user, self.request.data, Cart, CartItem, Cart_serializers, 'post')

    def put(self, request, *args, **kwargs):
        user = self.request.user
        return manipulate2(user, self.request.data, Cart, CartItem, Cart_serializers, 'put')

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        return manipulate2(user, self.request.data, Cart, CartItem, Cart_serializers, 'delete')


class Order_view(generics.ListCreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = Order_serializers

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        user = self.request.user
        return manipulate2(user, self.request.data, Order, OrderItem, Order_serializers, 'post')

    def put(self, request, *args, **kwargs):
        user = self.request.user
        return manipulate2(user, self.request.data, Order, OrderItem, Order_serializers, 'put')

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        return manipulate2(user, self.request.data, Order, OrderItem, Order_serializers, 'delete')


class Cart_to_order_view(generics.ListCreateAPIView):
    serializer_class = Order_serializers

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser and not Order.objects.filter(user=user).exists():

            cart = Cart.objects.get(user=user)
            if cart:

                order = Order.objects.create(user=user, is_active=True)
                list_to_add = [OrderItem(order=order, item=cart_item.item, quantity=cart_item.quantity) for cart_item in cart.cart_cartitem.all()]
                with transaction.atomic():
                    OrderItem.objects.bulk_create(list_to_add)

                return Response(Order_serializers(order).data, status=status.HTTP_201_CREATED)

            return Response({'error':'cart not found'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authintaced'}, status=status.HTTP_401_UNAUTHORIZED)


class test(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = User_serializer

    def post(self, request):
        print(User.__name__)
        return
