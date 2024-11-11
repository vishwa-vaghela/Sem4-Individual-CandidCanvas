import csv
from django.core.management.base import BaseCommand
from visualvibes.models import KeywordsData

class Command(BaseCommand):
    help = "Import data from a Keywords TSV file into the database"
    
    def handle(self, *args, **kwargs):
        file_path = 'D://VisualVibes/Imgae_data/keywords.tsv000'  # Path to the uploaded file
        start_from_row = 1754551

        with open(file_path, newline='', encoding='utf-8') as tsvfile:
            reader = csv.DictReader(tsvfile, delimiter='\t')
            for i,row in enumerate(reader,start=1):
                if i < start_from_row:
                    continue 
                # Access the columns you want
                photo_id = row['photo_id']
                keyword = row['keyword']
                

                # Save to the database
                KeywordsData.objects.create(
                    photo_id=photo_id,
                    keyword=keyword
                )
                
                if i % 1000 == 0:
                    self.stdout.write(f'Processed {i} rows...')

        self.stdout.write(self.style.SUCCESS('Successfully imported data from TSV!'))
