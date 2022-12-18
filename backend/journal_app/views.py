from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer, EntrySerializer
import json, requests
import os

def index(request):
    file = open('static/index.html').read()
    resp = HttpResponse(file)
    return resp

# DJANGO API VIEWS
@api_view(["POST"])
def user_signup(request):
    if request.method == 'POST':
        try:
            print(request.data)
            user = User.objects.create_user(username=request.data['username'], email=request.data['email'], password=request.data['password'])
            user.save()
            print('user created')
            return JsonResponse({'success': 'successfully signed up'})
        except Exception as signup_exception:
            print('signup failed to create user')
            print(str(signup_exception))
            return JsonResponse({'failure': 'failure'})

@api_view(["POST"])
def user_login(request):
    if request.method == 'POST':
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                try:
                    login(request, user)
                    serializer = UserSerializer(user)
                    return JsonResponse(serializer.data)
                except Exception as e:
                    print(e)
                    return JsonResponse({'failure': 'failed to log in'})
            else:
                return JsonResponse({'failure': 'user is not active'})
        else:
            return JsonResponse({'failure': 'no such user'})

@api_view(["POST"])
def user_logout(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'status': 'successfully logged out'})

@api_view(["GET"])
def who_am_i(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'username': request.user.username,
            'email': request.user.email
        })
    else:
        return JsonResponse({'user':None})

# 3RD PARTY API VIEWS
def get_quotes(request):
    r = requests.get('https://zenquotes.io/api/quotes')
    data = json.loads(r.text)
    return JsonResponse({'data':data})

def get_collection_ids(request):
    r = requests.get('https://api.pexels.com/v1/collections', headers={'Authorization': os.environ.get('PEXELS_API_KEY')})
    data= json.loads(r.text)
    return JsonResponse({'data': data})

@api_view(["POST"])
def get_collection_urls(request):
    id = request.data['id']
    print(id)
    r = requests.get(f'https://api.pexels.com/v1/collections/{id}', headers={'Authorization': os.environ.get('PEXELS_API_KEY')})
    data= json.loads(r.text)
    return JsonResponse({'data': data})

