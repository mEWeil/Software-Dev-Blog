from rest_framework import serializers
from .models import User, Entry

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'password', 'email', 'is_active']

class EntrySerializer(serializers.ModelSerializer):
  class Meta:
    model = Entry
    fields = ['id', 'title', 'created', 'edited', 'entry', 'favorite', 'entrytype', 'user']