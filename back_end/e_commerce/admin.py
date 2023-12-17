from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(User)
admin.site.register(Items)
admin.site.register(Categories)
admin.site.register(Comments)
admin.site.register(Up_votes)
admin.site.register(WishList)
admin.site.register(Cart)