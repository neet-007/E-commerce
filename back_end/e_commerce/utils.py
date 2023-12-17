from rest_framework import status
from rest_framework.response import Response
from .models import Items
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
