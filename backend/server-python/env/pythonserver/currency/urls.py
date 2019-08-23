from django.urls import path
from django.conf.urls import url
from randomUserData import views

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^eur/$', views.Currency.getEur), #.../currency/eur
]
