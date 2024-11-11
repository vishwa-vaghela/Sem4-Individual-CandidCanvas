import random
from django.core.management.base import BaseCommand
from visualvibes.models import UserImageData, PhotoData
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Import images from PhotoData into UserImageData table'

    def handle(self, *args, **kwargs):
        # Sample data for users
        users_data = [
            {"user_id": "@Shutter_Soul", "username": "ShutterSoul", "category": "landscape"},
            {"user_id": "@Urban_Lens", "username": "UrbanLens", "category": "city"},
            {"user_id": "@Wildlife_Whisper", "username": "WildlifeWhisper", "category": "animal"},
            {"user_id": "@Potrait_Muse", "username": "PotraitMuse", "category": "long"},
            {"user_id": "@Abstract_Vision", "username": "AbstractVision", "category": "color"},
            {"user_id": "@Travel_Nomad", "username": "TravelNomad", "category": "hill"},
            {"user_id": "@Street_Shadow", "username": "StreetShadow", "category": "street"},
            {"user_id": "@Nature_Glimpse", "username": "NatureGlimpse", "category": "water"},
        ]

        # Loop through the user data and fetch photos for each category
        for user_data in users_data:
            # Fetch photo data filtered by ai_description containing the user's category
            photo_data = PhotoData.objects.filter(ai_description__icontains=user_data['category'])

            # Check if there are enough photos, randomly select 15–20 if available
            photos_to_add = list(photo_data[:15])

            if not photos_to_add:
                self.stdout.write(self.style.WARNING(f'No photos found for category: {user_data["category"]}'))
                continue

            # Create UserImageData entries
            for photo in photos_to_add:
                UserImageData.objects.create(
                    user_id=user_data['user_id'],
                    username=user_data['username'],
                    photo_id=photo.photo_id,
                    photo_image_url=photo.photo_image_url,
                    likes=random.randint(10000, 500000),  # Generate random number of likes
                    category=user_data['category'],
                    ai_description=photo.ai_description
                )

            self.stdout.write(self.style.SUCCESS(f'Successfully added images for user {user_data["username"]}'))
