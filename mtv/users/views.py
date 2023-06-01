from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, viewsets
from .models import Customer, Cart
from .serializer import UserCreateSerializer, UserSerializer, CustomerSerializer, CartSerializer, CartDetailSerializer


class RegisterView(APIView):
    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)

class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)

    # action_to_serializer = {
    #     "retrieve": CartDetailSerializer
    # }

    # def get_serializer_class(self):
    #     return self.action_to_serializer.get (
    #         self.action,
    #         self.serializer_class
    #     )


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    action_to_serializer = {
        "retrieve": CartDetailSerializer
        # "retrieve": CartProductDetailSerializer, 
    }

    # action_to_serializer = {
    #     "retrieve": CartProductDetailSerializer, 
    # }

    def get_serializer_class(self):
        return self.action_to_serializer.get (
            self.action,
            self.serializer_class
        )
 

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer    