import random
import string
from visualvibes.models import User
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Populates the User model with random users and bios."

    def generate_random_string(self, length=12):
        """Generate a random string of letters and digits."""
        letters_and_digits = string.ascii_letters + string.digits
        return ''.join(random.choice(letters_and_digits) for _ in range(length))

    def populate_users_with_bios(self, n=1):
        bios = [
            "Night photographer drawn to the mystery and beauty of the world after dark. I focus on capturing the quiet, often overlooked moments of the night, from starry skies to neon-lit streets, revealing a different perspective on familiar scenes.",
            "Coastal photographer with a love for the sea and shore. My work captures the ever-changing moods of the ocean, from tranquil waves to stormy skies, showcasing the beauty and power of the coastline.",
            "Photographer inspired by the charm of vintage aesthetics. I focus on creating images with a nostalgic feel, using techniques and subjects that evoke memories of bygone eras, celebrating the timeless appeal of the past.",
            "Macro photographer fascinated by the tiny details of the world. My work reveals the intricate patterns and textures that are often missed, turning the small and unseen into captivating and mysterious subjects.",
            "Adventure photographer capturing the thrill of the great outdoors. My images focus on the rugged beauty of nature and the spirit of exploration, documenting the challenges and rewards of venturing into the wild."
        ]
        
        for _ in range(n):
            random_number = random.randint(100, 999)
            username = f"Anonymous{random_number}"
            user_id = f"@anonymous_{random_number}"
            bio = random.choice(bios)
            followers = random.randint(0, 1000)
            following = random.randint(0, 1000)
            
            User.objects.create(
                user_id=user_id,
                username=username,
                bio=bio,
                followers=followers,
                following=following
            )
        self.stdout.write(self.style.SUCCESS(f"{n} random users with random bios have been added."))

    def handle(self, *args, **kwargs):
        # Populate the database with new users
        self.populate_users_with_bios(n=20)
