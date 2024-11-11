from django.urls import path
from .views import (
    fetch_images,
    fetch_images_for_most_liked,
    fetch_images_for_most_followed,
    fetch_user_details,
    fetch_images_for_user,
    update_likes,
    update_followers,
    upload_image,
    search_images
)
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("fetch-images/", fetch_images, name="fetch-images"),
    path(
        "fetch-images-for-most-liked/",
        fetch_images_for_most_liked,
        name="fetch-images-for-most-liked",
    ),
    path(
        "fetch-images-for-most-followed/",
        fetch_images_for_most_followed,
        name="fetch-images-for-most-followed",
    ),
    path("fetch-user-details/", fetch_user_details, name="fetch-user-details"),
    path("fetch-images-for-user/", fetch_images_for_user, name="fetch-images-for-user"),
    path("update-likes/",update_likes,name='update-like'),
    path("update-followers/",update_followers,name='update-followers'),
    path('upload-image/',upload_image,name='upload-image'),
    path("search-images/",search_images,name="search-images"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
