"""delete
if user and user is not AnonymousUser:

            cart = Cart.objects.get(user=user)

            if cart:
                if Cart_serializers(data=self.request.data).is_valid():
                    existing_items = set(map(int, (self.request.data).get('items', [])))

                    if existing_items:
                        existing_objects = Items.objects.filter(id__in=existing_items)

                        existing_ids = set(item.id for item in existing_objects)

                        missing_items = existing_items - existing_ids
                        if missing_items:
                            return Response({'error':'items not found {}'.format(missing_items)}, status=status.HTTP_400_BAD_REQUEST)

                        cart.items.remove(*existing_objects)
                        cart.save()

                        return Response(Cart_serializers(cart).data, status=status.HTTP_201_CREATED)

                    return Response({'error':'items not found'}, status=status.HTTP_400_BAD_REQUEST)

                return Response({'error':'data is invalid'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'error':'user doesnt have a cart'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authenticated'}, status=status.HTTP_400_BAD_REQUEST)"""



"""put
if user and user is not AnonymousUser:
            cart = Cart.objects.get(user = user)

            if cart:

                if Cart_serializers(data=self.request.data).is_valid():
                    existing_items = set(map(int, (self.request.data).get('items',[])))

                    if existing_items:
                        existing_objects = Items.objects.filter(id__in=existing_items)

                        existing_ids = set(item.id for item in existing_objects)

                        missing_items = existing_items - existing_ids
                        if missing_items:
                            return Response({'error':'items not found {}'.format(missing_items)}, status=status.HTTP_400_BAD_REQUEST)

                        cart.items.add(*existing_objects)
                        cart.save()

                        return Response(Cart_serializers(cart).data, status=status.HTTP_201_CREATED)

                    return Response({'error':'items not found'}, status=status.HTTP_400_BAD_REQUEST)

                return Response({'error':'invalid data'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'error':'user doesnt have a cart'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authenticated'}, status=status.HTTP_400_BAD_REQUEST)"""




"""delete
if user and user is not AnonymousUser:
            wishlist = WishList.objects.get(user=user)

            if wishlist:
                if WishList_serializers(data=self.request.data).is_valid():
                    existing_items = set(map(int, (self.request.data).get('items', [])))
                    if existing_items:
                        existing_objects = Items.objects.filter(id__in=existing_items)

                        existing_ids = set(item.id for item in existing_objects)

                        missing_items = existing_items - existing_ids

                        if missing_items:
                            return Response({'error':'items not found {}'.format(missing_items)}, status=status.HTTP_400_BAD_REQUEST)

                        wishlist.items.remove(*existing_objects)
                        wishlist.save()

                        return Response(WishList_serializers(wishlist).data, status=status.HTTP_201_CREATED)

                    return Response({'error':'items not found'}, status=status.HTTP_400_BAD_REQUEST)

                return Response({'error':'data is invalid'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'error':'user doesnt have wishlist'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authenticated'}, status=status.HTTP_400_BAD_REQUEST)"""



"""put
if user and user is not AnonymousUser:
            wishlist = WishList.objects.get(user=user)

            if wishlist:
                existing_items = set(map(int, (self.request.data).get('items', [])))

                if existing_items:
                    existing_objects = Items.objects.filter(id__in=existing_items)

                    existing_ids = set(item.id for item in existing_objects)

                    missing_items = existing_items - existing_ids
                    if missing_items:
                        return Response({'error':'items not found {}'.format(missing_items)}, status=status.HTTP_400_BAD_REQUEST)

                    wishlist.items.add(*existing_objects)
                    wishlist.save()

                    return Response(WishList_serializers(wishlist).data, status=status.HTTP_201_CREATED)

                return Response({'error':'items not found'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'error':'user doesnt have wishlist'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authenticated'}, status=status.HTTP_400_BAD_REQUEST)"""


"""post
if user and user is not AnonymousUser:
            if not Cart.objects.filter(user=user).exists():
                serializers = items_id_quantity(data=self.request.data)
                if serializers.is_valid():
                    #items_list = set((self.request.data).get('item', []))
                    #quantity = self.request.data.get('quantity', [])

                    #if items_list and quantity and len(items_list) == len(quantity):

                        #if Items.objects.filter(id__in=items_list).exists:

                            #existing_ids = set(item.id for item in existing_objects)

                           # missing_items = existing_ids - items_list

                           # if missing_items:
                             #   return Response ({'error':'Items not found {}'.format(missing_items)}, status=status.HTTP_400_BAD_REQUEST)

                            cart = Cart.objects.create(
                                user=user,
                            )

                            cart_items_to_create = []
                            for i in range(len(serializers.validated_data.get('items'))):
                                item = Items.objects.get(id=serializers.validated_data.get('items')[i])
                                cart_items_to_create.append(CartItem(cart=cart, item=item, quantity=serializers.validated_data.get('quantity')[i]))

                            with transaction.atomic():
                                cart_items = CartItem.objects.bulk_create(cart_items_to_create)

                            return Response(Cart_serializers(cart).data, status=status.HTTP_201_CREATED)
                print(serializers.errors)
                return Response({'error':'data is invalid'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'error':'user already have a cart'})

        return Response({'error':'user is not authenticated'})
"""

"""post
if user and user is not AnonymousUser:

            if not Order.objects.filter(user=user, is_active=True).exists():
                serializers = items_id_quantity(data=self.request.data)

                if serializers.is_valid():
                    order = Order.objects.create(user=user, is_active=True)

                    order_items_to_create = []
                    for i in range(len(serializers.validated_data.get('items'))):
                        item = Items.objects.get(id=serializers.validated_data.get('items')[i])
                        order_items_to_create.append(OrderItem(order=order, item=item, quantity=serializers.validated_data.get('quantity')[i]))

                    with transaction.atomic():
                        OrderItem.objects.bulk_create(order_items_to_create)

                    return Response(Order_serializers(order).data, status=status.HTTP_201_CREATED)

                return Response({'error':'data is invalid'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'error':'user have order'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user is not authenticated'}, status=status.HTTP_400_BAD_REQUEST)"""


"""post
existing_items = set(map(int, data.get('items', [])))
            if existing_items:
                existing_objects = Items.objects.filter(id__in=existing_items)

                existing_ids = set(item.id for item in existing_objects)

                missing_items = existing_items - existing_ids

                if missing_items:
                    return Response({'error': 'Items not found: {}'.format(missing_items)}, status=status.HTTP_400_BAD_REQUEST)

                # Now all items exist in the database, proceed to add them to the category
                wishlist.items.add(*existing_objects)

                wishlist.save()

                return Response(WishList_serializers(wishlist).data, status=status.HTTP_201_CREATED)

            return Response({'error':'items not found'}, status=status.HTTP_400_BAD_REQUEST)"""