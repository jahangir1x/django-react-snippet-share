from django.urls import path
from . import views

urlpatterns = [
    path("snippets/<str:title>", views.SnippetRetrieveView.as_view(),
         name='snippet-retrieve'),
    path("snippets/", views.SnippetCreateView.as_view(), name='snippet-create'),

    path("utils/verify-title/",
         views.VerifySnippetTitleView.as_view(), name='verify-snippet-title'),
]
