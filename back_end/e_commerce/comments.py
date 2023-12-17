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