from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from rest_framework.decorators import api_view
from .models import User
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
            return JsonResponse({'success': 'success'})
        except Exception as signup_exception:
            print('signup failed to create user')
            print(str(signup_exception))
            return JsonResponse({'failure': 'failure'})

def user_login(request):
    pass

def user_logout(request):
    pass

# 3RD PARTY API VIEWS
def get_quotes(request):
    r = requests.get('https://zenquotes.io/api/quotes')
    data = json.loads(r.text)
    return JsonResponse({'data':data})

def get_collection_ids(request):
    r = requests.get('https://api.pexels.com/v1/collections', headers={'Authorization': os.environ.get('PEXELS_API_KEY')})
    data= json.loads(r.text)
    return JsonResponse({'data': data})

def get_collection_urls(request):
    r = requests.get('https://api.pexels.com/v1/collections/0uw9odl', headers={'Authorization': os.environ.get('PEXELS_API_KEY')})
    data= json.loads(r.text)
    return JsonResponse({'data': data})

