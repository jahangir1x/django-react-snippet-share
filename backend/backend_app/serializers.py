from rest_framework import serializers
from .models import Snippet


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = (
            'title',
            'language',
            'created_at',
            'text',
        )
