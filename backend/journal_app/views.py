from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from rest_framework.decorators import api_view
from .models import User, Entry, Comment
from .serializers import UserSerializer, EntrySerializer, CommentSerializer
import json, requests
import os

def index(request):
    file = open('static/index.html').read()
    resp = HttpResponse(file)
    return resp

"""
    DJANGO API VIEWS
"""

@api_view(["POST"])
def user_signup(request):
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
    logout(request)
    return JsonResponse({'status': 'successfully logged out'})

@api_view(["POST"])
def create_post(request):
    title = request.data['postTitle']
    entrytype = request.data['postTopic']
    post = request.data['post']
    author = request.data['author']
    user = request.user
    entry = Entry(title=title, entrytype=entrytype, entry=post, author=author ,user=user)
    entry.save()
    return JsonResponse({'status': 'entry created'})

@api_view(["GET"])
def get_posts(request):
    entry_list = list(Entry.objects.all())
    serializer = EntrySerializer(entry_list, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['DELETE'])
def delete_post(request, post_id):
    post = Entry.objects.get(pk=post_id)
    post.delete()
    return JsonResponse({'Status': 'deletion successful'})

@api_view(['PUT'])
def update_post(request, post_id):
    entry = Entry.objects.get(pk=post_id)
    serializer = EntrySerializer(entry, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({'success': True})
    print(serializer.errors)
    return JsonResponse({'success': False})

@api_view(["POST"])
def create_comment(request):
    comment = request.data['comment']
    author = request.data['author']
    user = request.user
    entry= Entry.objects.get(pk=request.data['entry'])
    new_comment = Comment(comment=comment, author=author ,user=user, entry=entry)
    new_comment.save()
    return JsonResponse({'status': 'comment created'})

@api_view(["GET"])
def get_comments(request):
    comment_list = list(Comment.objects.all())
    serializer = CommentSerializer(comment_list, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['DELETE'])
def delete_comment(request, comment_id):
    comment = Comment.objects.get(pk=comment_id)
    comment.delete()
    return JsonResponse({'Status': 'comment deletion successful'})

@api_view(['PUT'])
def update_comment(request, comment_id):
    comment = Comment.objects.get(pk=comment_id)
    serializer = CommentSerializer(comment, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({'success': True})
    print(serializer.errors)
    return JsonResponse({'success': False})

"""
3RD PARTY API VIEWS
"""

def get_quotes(request):
    r = requests.get('https://zenquotes.io/api/quotes')
    data = json.loads(r.text)
    return JsonResponse({'data':data})

def get_collection_ids(request):
    r = requests.get('https://api.pexels.com/v1/collections', headers={'Authorization': os.environ.get('PEXELS_API_KEY')})
    data = json.loads(r.text)
    return JsonResponse({'data': data})

@api_view(["POST"])
def get_collection_urls(request):
    id = request.data['id']
    print(id)
    r = requests.get(f'https://api.pexels.com/v1/collections/{id}', headers={'Authorization': os.environ.get('PEXELS_API_KEY')})
    data= json.loads(r.text)
    return JsonResponse({'data': data})

