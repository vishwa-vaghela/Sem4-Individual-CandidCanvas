from django.db import models

class PhotoData(models.Model):
    photo_id = models.CharField(max_length=50)
    photo_url = models.URLField()
    photo_image_url = models.URLField()
    username=models.CharField(max_length=200)
    ai_description=models.CharField(max_length=200)
    likes=models.IntegerField(null=True,blank=True)
    user_id=models.CharField(max_length=150,null=True,blank=True)
    
class KeywordsData(models.Model):
    photo_id=models.CharField(max_length=50)
    keyword=models.CharField(max_length=100)
    
class User(models.Model):
    user_id=models.CharField(max_length=150)
    username=models.CharField(max_length=150)
    bio=models.TextField()
    followers=models.IntegerField()
    following=models.IntegerField()
    profile_img=models.ImageField(upload_to='visualvibes/images',null=True,blank=True)
    category=models.CharField(max_length=100,null=True,blank=True)
    
class UserImageData(models.Model):
    user_id=models.CharField(max_length=150)
    username=models.CharField(max_length=150)
    photo_id=models.CharField(max_length=50)
    photo_image_url=models.URLField()
    likes=models.IntegerField()
    category=models.CharField(max_length=100)
    ai_description=models.CharField(max_length=200)
    
class UserUploadedImages(models.Model):
    username=models.CharField(max_length=150)
    likes=models.IntegerField()
    description=models.TextField()
    images=models.ImageField(upload_to='visualvibes/upload')