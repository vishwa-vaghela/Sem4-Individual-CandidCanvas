from django.contrib import admin
from .models import PhotoData,KeywordsData,User,UserImageData,UserUploadedImages
# Register your models here.

admin.site.register(PhotoData)
admin.site.register(KeywordsData)
admin.site.register(User)
admin.site.register(UserImageData)
admin.site.register(UserUploadedImages)