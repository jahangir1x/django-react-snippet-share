from django.db import models
from django.utils import timezone


class Snippet(models.Model):
    title = models.CharField(max_length=48, primary_key=True, unique=True)
    language = models.CharField(max_length=32)
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.TextField()

    def __str__(self):
        return self.title
