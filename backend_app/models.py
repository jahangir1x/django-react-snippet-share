from django.db import models


class Snippet(models.Model):
    name = models.CharField(max_length=32)
    language = models.CharField(max_length=32)
    text = models.TextField()

    def __str__(self):
        return self.name
