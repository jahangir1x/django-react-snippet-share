from django.db import models
from django.utils import timezone

LANGUAGES = ('Python',
             'JavaScript',
             'Java',
             'C#',
             'C++',
             'TypeScript',
             'PHP',
             'Ruby',
             'Go',
             'Swift',
             'Kotlin',
             'Rust',
             'Objective-C',
             'Perl',
             'Scala',
             'Shell',
             'R',
             'MATLAB',
             'Groovy',
             'Lua',
             'Dart',
             'Haskell',
             'Julia',
             'PowerShell',
             'VBA',
             'F#',
             'Ada',
             'COBOL',
             'Fortran',
             'Lisp')


class Snippet(models.Model):
    LANGUAGE_CHOICES = [(lang, lang) for lang in LANGUAGES]
    title = models.CharField(max_length=48, primary_key=True, unique=True)
    language = models.CharField(max_length=32, choices=LANGUAGE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.TextField()

    def __str__(self):
        return self.title
