from django.urls import path
from . import views
urlpatterns = [
    path('', views.home.as_view(), name='home'),
    path('signup', views.signup_view.as_view(), name='signup'),
    path('login', views.login_view.as_view(), name='login'),
    path('logout', views.logout_view.as_view(), name='logout'),
    path('csrf', views.getCSRFToken.as_view(), name='csrf'),
    path('send-email/<str:type>', views.send_email_view.as_view(), name='send-email'),
    path('verification', views.verification.as_view(), name='verification'),
    path('get-user', views.get_user.as_view(), name='get-user'),
    path('items', views.items_view.as_view(), name='items'),
    path('user-items/<str:pk>', views.user_items_view.as_view(), name='user-items'),
    path('create-gender', views.create_gender_view.as_view(), name='general-categories'),
    path('create-categories', views.create_categories_view.as_view(), name='general-categories'),
    path('create-sub-categories', views.create_subcategories_view.as_view(), name='general-sub-categories'),
    path('add-item-to-gender/<int:pk>', views.add_item_to_gender_view().as_view(), name='add-item-to-gender'),
    path('add-item-to-category/<int:pk>', views.add_item_to_categories_view.as_view(), name='add-item-to-category'),
    path('add-item-to-sub-category/<int:pk>', views.add_item_to_sub_categories_view.as_view(), name='add-item-to-sub-category'),
    path('add-rating/<int:pk>', views.add_rating_view.as_view(), name='add-rating'),
    path('add-comment/<int:pk>', views.add_comment_to_post.as_view(), name='add-comment'),
    path('add-up-vote/<int:pk>', views.add_up_vote.as_view(), name='add-up-vote'),
    path('whishlist', views.wishlist_view.as_view(), name='whishlist'),
    path('cart', views.Cart_view.as_view(), name='cart'),
    path('order', views.Order_view.as_view(), name='order'),
    path('cart-to-order', views.Cart_to_order_view.as_view(), name='cart-to-order'),
    path('single-item/<int:pk>', views.single_item_view.as_view(), name='single-item'),
    path('single-category/<int:pk>', views.single_category.as_view(), name='single-item'),
    path('single-rating/<int:pk>', views.single_rating_view.as_view(), name='single-item'),
    path('single-comment/<int:pk>', views.single_comment_view.as_view(), name='single-comment'),
    path('single-up-vote/<int:pk>', views.single_up_vote.as_view(), name='single-up-vote'),




    path('test', views.test.as_view(), name='test')
]