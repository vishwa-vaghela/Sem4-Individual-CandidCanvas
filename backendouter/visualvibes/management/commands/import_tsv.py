import csv
import random
from django.core.management.base import BaseCommand
from visualvibes.models import PhotoData

class Command(BaseCommand):
    help = "Import data from a TSV file into the database"

    def handle(self, *args, **kwargs):
        file_path = 'D://VisualVibes/Imgae_data/photos.tsv000'  # Path to the uploaded file
        row_limit=3000
        row_count=0

        with open(file_path, newline='', encoding='utf-8') as tsvfile:
            reader = csv.DictReader(tsvfile, delimiter='\t')
            for row in reader:
                if row_count>=row_limit:
                    break
                # Access the columns you want
                photo_id = row['photo_id']
                photo_url = row['photo_url']
                photo_image_url = row['photo_image_url']
                username = row['photographer_username']
                firstname = row['photographer_first_name']
                lastname = row['photographer_last_name']
                ai_description = row['ai_description']
                likes=random.randint(10000,1000000)
                

                # Save to the database
                PhotoData.objects.create(
                    photo_id=photo_id,
                    photo_url=photo_url,
                    photo_image_url=photo_image_url,
                    username=username,
                    firstname=firstname,
                    lastname=lastname,
                    ai_description=ai_description,
                    likes=likes 
                )
                
                row_count+=1

        self.stdout.write(self.style.SUCCESS('Successfully imported data from TSV!'))
