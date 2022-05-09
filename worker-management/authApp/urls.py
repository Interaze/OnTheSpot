"""authDjango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from authApp.views import set_csrf_token, login_view, load_map, load_mission
from auth.views import CheckAuth

urlpatterns = [
    path('set-csrf/', set_csrf_token, name='Set-CSRF'),
    path('login/', login_view, name='Login'),
    path('test-auth/', CheckAuth.as_view(), name='Test-Auth'),
    path('load-map/', load_map, name='Load-Map'),
    path('load-mission/', load_mission, name='Load-Mission'),

#    path('example-view/', views.ExampleView.get, name='Example-View')
]
