from django.urls import path
from .views import home_page, add_car, search_car, delete_car

urlpatterns = [
    path('', home_page, name='home'),
    path('add_car', add_car, name='add_car'),
    path('search_car', search_car, name='search_car'),
    path('delete_car', delete_car, name='delete_car')
]