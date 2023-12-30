from django.shortcuts import render, get_object_or_404
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


class send_email_view(APIView):
    res = Response({'success':'email sent'}, status=status.HTTP_201_CREATED)
    def post(self, request, type, format=None):
        if type == 'verify':
            user = self.request.user
            token = Verification.objects.create(user=user)
            send_email_function(email=user.email, token_id=token.token, user_id=user.id)

            return self.res

        elif type == 'submit-order':
            user = self.request.user
            order = Order.objects.get(user=user, is_active=True)
            send_email_function(email=user.email, order=order, user=user)

            return self.res

        elif type == 'order-delivered':
            user = self.request.user
            order = Order.objects.get(user=user)
            order.is_active = False
            order.save()
            serialized_data = Order_serializers(order).data
            send_email_function(email=user.email, order_d=serialized_data, user=user)

            return self.res

        return Response({'error':'invalid type'}, status.HTTP_400_BAD_REQUEST)


class verification(APIView):
    def post(self, request, format=None):
        token = self.request.data['token']
        user_id = self.request.data['user_id']

        if Verification.objects.filter(token=token, user__id=user_id).exists():
            user = get_object_or_404(User, id=user_id)
            user.is_verified = True
            user.save()

            Verification.objects.get(user=user, token=token).delete()
            return Response({'success':'user is now verified'}, status=status.HTTP_201_CREATED)

        return Response({'error':'invalid credintails'})


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
            serialized_data = Items_serializers(data=data)
            if serialized_data.is_valid():

                item = Items.objects.create(
                    user=user,
                    name=data['name'],
                    description=data['description'],
                    price=data['price'],
                    in_stock=True
                )

                if serialized_data.validated_data.get('category'):
                    categories = Categories.objects.filter(id__in=serialized_data.validated_data.get('category'))
                    item.category.add(*categories)

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


class single_item_view(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Items_serializers

    def get_queryset(self):
        return Items.objects.filter(id=self.kwargs['pk'], user=self.request.user)

    def put(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:

            item = get_object_or_404(Items, id=self.kwargs['pk'], user=user)
            serializerd_data = Items_serializers(data=self.request.data)
            if serializerd_data.is_valid():
                serializerd_data.update(item, serializerd_data.validated_data)

                return Response(serializerd_data.data, status=status.HTTP_201_CREATED)

            return Response({'error':'data is invalid'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authentaidec'}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:

            item = get_object_or_404(Items, id=self.kwargs['pk'], user=user)
            item.delete()

            user.items_count -= 1
            user.save()

            return Response({'success':f'item {item} deleted'}, status=status.HTTP_200_OK)

        return Response({'error':'user is not autheniticed'}, status=status.HTTP_400_BAD_REQUEST)


class create_categories_view(generics.ListCreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = Categories_serializers
    queryset = Categories.objects.all()

    def post(self, request):
        user = self.request.user

        if user and user is not AnonymousUser:
            data = self.request.data

            if Categories_serializers(data=data).is_valid():
                category = Categories.objects.create(
                    name=data['name']
                )

                return Response(Categories_serializers(category).data, status=status.HTTP_201_CREATED)

            return Response({'error':'invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authneticated'}, status=status.HTTP_401_UNAUTHORIZED)


class single_category(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Categories_serializers

    def get_queryset(self):
        return Categories.objects.filter(id=self.kwargs['pk'])

    def put(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:

            category = get_object_or_404(Categories, id=self.kwargs['pk'])
            serialized_data = Categories_serializers(data=self.request.data)
            if serialized_data.is_valid():

                serialized_data.update(category, serialized_data.validated_data)

                return Response(serialized_data.data, status=status.HTTP_201_CREATED)

            return Response({'error':'data is invalid'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authentaiced'}, status=status.HTTP_401_UNAUTHORIZED)


class add_item_to_categories_view(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategoriesWithItemsSerializer

    def get_queryset(self):
        return Categories.objects.filter(id=self.kwargs['pk'])

    def put(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:
            category = Categories.objects.get(id=self.kwargs['pk'])

            if category:
                items = Items.objects.filter(id__in=(self.request.data.get('items')))
                if items:
                    for item in items:
                        item.category.add(category)
                        item.save()

                    return Response(Categories_serializers(category).data, status=status.HTTP_201_CREATED)

                return Response({'error':'item not found'})

            return Response({'error':'category not found'})

        return Response({'error':'user is not authenticated'})

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:

            category = get_object_or_404(Categories, id=self.kwargs['pk'])
            items = Items.objects.filter(id__in=(self.request.data).get('items'))
            if items:
                for item in items:
                    item.category.remove(category)
                    item.save()

                return Response({'success':'items removed from category'}, status=status.HTTP_200_OK)

            return Response({'error':'items not fonud'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)


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


class single_rating_view(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Ratings_serializers

    def get_queryset(self):
        return Ratings.objects.filter(id=self.kwargs['pk'])

    def put(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:

            rating = get_object_or_404(Ratings, user=user, id=self.kwargs['pk'])
            serialized_data = Ratings_serializers(data=self.request.data)
            if serialized_data.is_valid():

                serialized_data.update(rating, serialized_data.validated_data)

                return Response(serialized_data.data, status=status.HTTP_201_CREATED)

            return Response({'error':'data is invalid'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authenticad'}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:

            rating = get_object_or_404(Ratings, id=self.kwargs['pk'], user=user)
            rating.delete()

            return Response({'success':f'rating {rating} deleted'}, status=status.HTTP_201_CREATED)

        return Response({'error':'user is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)


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


class single_comment_view(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Comments_serializers

    def get_queryset(self):
        return Comments.objects.filter(id=self.kwargs['pk'])

    def put(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:

            comment = get_object_or_404(Comments, id=self.kwargs['pk'], user=user)
            serializerd_data = Comments_serializers(data=self.request.data)
            if serializerd_data.is_valid():

                serializerd_data.update(comment, serializerd_data.validated_data)
                return Response(serializerd_data.data, status=status.HTTP_201_CREATED)

            return Response({'error':'data is invalid'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:

            comment = get_object_or_404(Comments, id=self.kwargs['pk'], user=user)
            comment.delete()

            return Response({'success':f'comment {comment} deleted'}, status=status.HTTP_201_CREATED)

        return Response({'error':'user is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)


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

                comment.up_votes += 1
                comment.save()
                return Response(Up_votes_serializers(up_vote).data, status=status.HTTP_201_CREATED)

            return Response({'error':'comment not found or user already liked it'})

        return Response({'error':'user is not authenricated'})


class single_up_vote(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Up_votes_serializers

    def get_queryset(self):
        return Up_votes.objects.filter(id=self.kwargs['pk'])

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        if user and user is not AnonymousUser:

            up_vote = get_object_or_404(Up_votes, id=self.kwargs['pk'], user=user)
            comment = get_object_or_404(Comments, comment_up_votes=up_vote)
            up_vote.delete()
            comment.up_votes -= 1
            comment.save()


            return Response({'success':'upvote deleted'}, status=status.HTTP_201_CREATED)

        return Response({'error':'user is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)


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
