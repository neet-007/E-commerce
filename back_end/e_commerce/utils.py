from rest_framework import status
from rest_framework.response import Response
from .models import Items
from .serializers import items_id_quantity
from django.db import transaction
from django.contrib.auth.models import AnonymousUser
def manipulate(user, data, object, serializer, command, *args, **kwargs):
    if user and user is not AnonymousUser:

        instance = object.objects.get(user=user)
        #print ('a' if instance else 0)

        if instance:
            return get_item(data, instance, serializer, command)

        return Response({'error':'not found'})

    return Response({'error':'user is not authenticated'})

def get_item(data, instance, serializer, command):
    if serializer(data=data).is_valid():
        existing_items = set(map(int, data.get('items', [])))
        if existing_items:
            existing_objects = Items.objects.filter(id__in=existing_items)

            existing_ids = set(item.id for item in existing_objects)

            missing_items = existing_items - existing_ids

            if missing_items:
                return Response({'error':'items not found {}'.format(missing_items)}, status=status.HTTP_400_BAD_REQUEST)

            if command == 'put' or command == 'post':
                instance.items.add(*existing_objects)
                instance.save()

            elif command == 'delete':
                instance.items.remove(*existing_objects)
                instance.save()

            else:
                raise ValueError

            return Response(serializer(instance).data, status=status.HTTP_201_CREATED)

        return Response({'error':'items not found'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error':'invalid data'})

def manipulate2(user, data, object, object_item, serializer, command):
    if user and user is not AnonymousUser:

        if command == 'post':
            if not object.objects.filter(user=user).exists():
                instance = object.objects.create(user=user)
            else:
                return Response({'error':'user has' + user.username}, status=status.HTTP_400_BAD_REQUEST)

        else:
            instance = object.objects.get(user=user)
        if instance:

            serializers = items_id_quantity(data=data)
            if serializers.is_valid():
                items = serializers.validated_data.get('items')
                quantity = serializers.validated_data.get('quantity')
                items_list = []

                if command == 'delete':
                    if (object.__name__).lower() == 'order':
                        object_item.objects.filter(order=instance, item__id__in=items).delete()
                    elif (object.__name__).lower() == 'cart':
                        object_item.objects.filter(cart=instance, item__id__in=items).delete()
                    else:
                        return Response({'error':'class doesnt exists'}, status=status.HTTP_400_BAD_REQUEST)

                elif command != 'delete':
                    for i in range(len(items)):
                        item = Items.objects.get(id=items[i])
                        if (object.__name__).lower() == 'order':
                            items_list.append(object_item(order=instance, item=item, quantity=quantity[i]))
                        elif (object.__name__).lower() == 'cart':
                            items_list.append(object_item(cart=instance, item=item, quantity=quantity[i]))

                    with transaction.atomic():
                        object_item.objects.bulk_create(items_list)

                return Response(serializer(instance).data, status=status.HTTP_201_CREATED)

            return Response({'error':'data is invalid'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'user doesnt have order'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error':'user is not authenticated'}, status=status.HTTP_400_BAD_REQUEST)