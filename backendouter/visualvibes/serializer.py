from rest_framework.serializers import ModelSerializer
from .models import PhotoData,UserImageData,User,UserUploadedImages

class PhotoSerializer(ModelSerializer):
    class Meta:
        model=PhotoData
        fields='__all__'

class UserImageSerializer(ModelSerializer):
    class Meta:
        model=UserImageData
        fields='__all__'
        
class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields='__all__'
        
class UserUploadSerializer(ModelSerializer):
    class Meta:
        model=UserUploadedImages
        fields='__all__'