from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response

class CheckAuth(APIView):
    authentication_classes = [SessionAuthentication]
    def get(self, request):
        return Response({'detail': 'You\'re Authenticated'})