from django.shortcuts import render
from .models import PhotoData,UserImageData,User,UserUploadedImages
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import PhotoSerializer,UserSerializer,UserUploadSerializer
from django.core.files.storage import default_storage
from django.conf import settings
import random

# Create your views here.
@api_view(['GET'])
def fetch_images(request):
    n1=random.randint(1,3000)
    if n1>3000:
        n1-=10
    n2=n1+10
    img_list=PhotoData.objects.all()[n1:n2]
    # img_list=PhotoData.objects.filter(ai_description__icontains='color')
    # print(len(img_list))
    # img_list=img_list[:15]
    serializer = PhotoSerializer(img_list, many=True)
    return Response({'images':serializer.data})

@api_view(['POST'])
def fetch_images_for_user(request):
    user = request.data.get('username')

    users_data = list(User.objects.all().values())
    usernames = [user['username'] for user in users_data]
    
    user_exists = user in usernames

    if user_exists:
        data = PhotoData.objects.filter(username=user)
        serializer = PhotoSerializer(data, many=True)
        return Response({'images': serializer.data[:15], 'is_new_user': "false"})
    else:
        data = UserUploadedImages.objects.filter(username=user)
        serializer = UserUploadSerializer(data, many=True)

        # Build image URLs for new users' uploaded images
        for image_data in serializer.data:
            image_field_value = image_data.get('images')
            if image_field_value:
                image_data['photo_image_url'] = request.build_absolute_uri(image_field_value)              
                print(image_data['photo_image_url'])

        return Response({'images': serializer.data, 'is_new_user': "true"})
        

@api_view(['POST'])
def fetch_user_details(request):
    user=request.data.get('username')
    
    users_data=list(User.objects.all().values())
    usernames=[user['username'] for user in users_data]
    user_exists = user in usernames

    if user_exists:
        data=User.objects.filter(username=user)
        posts=PhotoData.objects.filter(username=user)
        count=len(posts)
        
        serializer=UserSerializer(data,many=True)
        # print(serializer.data[0])
        followers=serializer.data[0]['followers']
        following=serializer.data[0]['following']
        profile_image_url = request.build_absolute_uri(serializer.data[0]['profile_img'])
        if(profile_image_url=='http://127.0.0.1:8000/fetch-user-details/'):
            profile_image_url=request.build_absolute_uri('/media/visualvibes/images/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg')
        bio=serializer.data[0]['bio']
        return Response({'followers':followers,'following':following,'profile_img':profile_image_url,'bio':bio,'count':count})
    else:
        followers=0
        following=0
        profile_image_url=request.build_absolute_uri('/media/visualvibes/images/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg')
        bio='This is new user'
        posts=len(UserUploadedImages.objects.filter(username=user))
        return Response({'followers':followers,'following':following,'profile_img':profile_image_url,'bio':bio,'count':posts})
    

@api_view(['GET'])
def fetch_images_for_most_liked(request):
    img_list=list(PhotoData.objects.order_by('-likes'))
    img_list=img_list[:5]
    serializer=PhotoSerializer(img_list,many=True)
    return Response({'images':serializer.data})

@api_view(['GET'])
def fetch_images_for_most_followed(request):
    img_list=list(User.objects.order_by('-followers'))
    img_list=img_list[:7]
    serializer=UserSerializer(img_list,many=True)
    return Response({'images':serializer.data})

@api_view(['POST'])
def update_likes(request):
    id=request.data.get('id')
    photo=PhotoData.objects.get(photo_id=id)
    photo.likes+=1
    photo.save()
    
    return Response({'success':True},status=200)

@api_view(['POST'])
def update_followers(request):
    username = request.data.get('username')
    action = request.data.get('action')  # 'follow' or 'unfollow'

    try:
        user = User.objects.get(username=username)

        if action == 'follow':
            user.followers += 1
        elif action == 'unfollow':
            user.followers = max(user.followers - 1, 0)  # Avoid negative followers

        user.save()

        return Response({'message': 'Followers updated successfully'}, status=200)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    
    
@api_view(['POST'])
def upload_image(request):
    username = request.data.get('username')
    description = request.data.get('description')
    image = request.FILES.get('image')

    if not username or not image or not description:
        return Response({'error': 'All fields are required'}, status=400)

    # Creating the instance and saving to the database
    new_image = UserUploadedImages(
        username=username,
        description=description,
        images=image,
        likes=0  # Initialize likes to 0
    )
    new_image.save()

    return Response({'message': 'Image uploaded successfully'}, status=201)


@api_view(['POST'])
def search_images(request):
    search=request.data.get('search')
    img_list=PhotoData.objects.filter(ai_description__icontains=search)
    serializer = PhotoSerializer(img_list, many=True)
    return Response({'images':serializer.data})