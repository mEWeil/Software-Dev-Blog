from django.db import models
from django.contrib.auth.models import (AbstractUser)

class User(AbstractUser):
  username = models.CharField(max_length=20, unique=True)
  password = models.CharField(max_length=100)
  email = models.EmailField(unique=True)
  is_active = models.BooleanField(default=True)
  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = ['email']

class Entry(models.Model):
  title = models.CharField(max_length=50)
  created = models.DateTimeField(auto_now_add=True)
  edited = models.DateTimeField(auto_now=True, blank=True)
  entry = models.TextField()
  favorite = models.BooleanField(default=False)
  entrytype = models.CharField(max_length=50, blank=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)