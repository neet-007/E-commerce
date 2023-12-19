from django.urls import path
from . import views
urlpatterns = [
    path('', views.home.as_view(), name='home'),
    path('signup', views.signup_view.as_view(), name='signup'),
    path('login', views.login_view.as_view(), name='login'),
    path('logout', views.logout_view.as_view(), name='logout'),
    path('csrf', views.getCSRFToken.as_view(), name='csrf'),
    path('items', views.items_view.as_view(), name='items'),
    path('user-items/<str:pk>', views.user_items_view.as_view(), name='user-items'),
    path('create-categories', views.create_categories_view.as_view(), name='general-categories'),
    path('add-item-to-category/<int:pk>', views.add_item_to_categories_view.as_view(), name='add-item-to-category'),
    path('add-rating/<int:pk>', views.add_rating_view.as_view(), name='add-rating'),
    path('add-comment/<int:pk>', views.add_comment_to_post.as_view(), name='add-comment'),
    path('add-up-vote/<int:pk>', views.add_up_vote.as_view(), name='add-up-vote'),
    path('whishlist', views.wishlist_view.as_view(), name='whishlist'),
    path('cart', views.Cart_view.as_view(), name='cart'),
    path('order', views.Order_view.as_view(), name='order'),
    path('cart-to-order', views.Cart_to_order_view.as_view(), name='cart-to-order'),




    path('test', views.test.as_view(), name='test')
]