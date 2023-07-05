from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Snippet
from .serializers import SnippetSerializer
import time


class VerifySnippetTitleView(APIView):
    def post(self, request):
        time.sleep(3)
        try:
            Snippet.objects.get(title=request.data['title'])
            return Response({
                "status": "false",
                "message": "Title is not available (╥﹏╥)"
            }, status=status.HTTP_200_OK)
        except Snippet.DoesNotExist:
            return Response({
                "status": "true",
                "message": "Title is available"
            }, status=status.HTTP_200_OK)


class SnippetRetrieveView(APIView):
    def get(self, request, title):
        try:
            snippet = Snippet.objects.get(title=title)
            serialized_snippet = SnippetSerializer(snippet)
            response_data = serialized_snippet.data
            response_data["status"] = "true"
            return Response(response_data, status=status.HTTP_200_OK)
        except:
            return Response({
                "status": "false",
                "message": "Snippet does not exist (╥﹏╥)",
            }, status=status.HTTP_404_NOT_FOUND)


class SnippetCreateView(APIView):
    def post(self, request):
        
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response_data = dict()
            response_data['title'] = serializer.data['title']
            response_data['status'] = 'true'
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            response_data = {
                'status': 'false',
                'message': 'bad request (╥﹏╥)',
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
