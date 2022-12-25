from . import views
from django.urls import path, re_path

urlpatterns = [
    path('', views.index, name='index'),
    path('api/signup', views.user_signup),
    path('api/login', views.user_login),
    path('api/logout', views.user_logout),
    path('api/createpost', views.create_post),
    path('api/getposts', views.get_posts),
    path('api/deletepost/<int:post_id>', views.delete_post),
    path('api/updatepost/<int:post_id>', views.update_post),
    path('api/createcomment', views.create_comment),
    path('api/getcomments', views.get_comments),
    path('api/deletecomment/<int:comment_id>', views.delete_comment),
    path('api/updatecomment/<int:comment_id>', views.update_comment),
    path('api/getquotes', views.get_quotes),
    path('api/getcollectionids', views.get_collection_ids),
    path('api/getcollectionurls', views.get_collection_urls),
    re_path(r'.*', views.index),
]