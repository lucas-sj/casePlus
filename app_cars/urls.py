from django.urls import path
from .views import home_page, add_car

urlpatterns = [
    path('', home_page, name='home'),
    path('add_car', add_car, name='add_car'),
]