from . import views
from django.urls import path

urlpatterns = [
    path('', views.index),
    path('api/signup', views.user_signup),
    path('api/login', views.user_login),
    path('api/logout', views.user_logout),
    path('api/getquotes', views.get_quotes),
    path('api/getcollectionids', views.get_collection_ids),
    path('api/getcollectionurls', views.get_collection_urls),
    
]