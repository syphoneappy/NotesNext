from django.urls import path 
from . import views
from .views import LogoutView
urlpatterns = [
   path('register/',views.register , name='register'),
   path('login/', views.login, name='login'),
   path('logout/', LogoutView.as_view(), name='logout'),
   path('check_usr/', views.currentUser)
]
