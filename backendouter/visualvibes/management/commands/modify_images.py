# # import random
# # from django.core.management.base import BaseCommand
# # from visualvibes.models import PhotoData

# # class Command(BaseCommand):
# #     help = 'Modify PhotoData table by reducing rows to 3000 and adding random likes'

# #     def handle(self, *args, **kwargs):
# #         # Step 1: Reduce rows to 3000
# #         total_rows = PhotoData.objects.count()
        
# #         if total_rows > 3000:
# #             # Get the IDs of the excess rows to delete
# #             excess_rows = total_rows - 3000
# #             photos_to_delete = PhotoData.objects.order_by('id').values_list('id', flat=True)[:excess_rows]
            
# #             # Delete the extra rows
# #             PhotoData.objects.filter(id__in=photos_to_delete).delete()
# #             self.stdout.write(self.style.SUCCESS(f'Successfully deleted {excess_rows} rows.'))
        
# #         # # Step 2: Add random 'likes' for remaining 3000 rows
# #         # remaining_photos = PhotoData.objects.all()
# #         # for photo in remaining_photos:
# #         #     photo.likes = random.randint(10000, 1000000)
# #         #     photo.save()

# #         # self.stdout.write(self.style.SUCCESS('Successfully updated likes for remaining photos.'))



# from django.core.management.base import BaseCommand
# from visualvibes.models import PhotoData

# class Command(BaseCommand):
#     help = 'Delete the first 22,000 rows from the PhotoData table'

#     def handle(self, *args, **kwargs):
#         # Step 1: Delete the first 22,000 rows
#         total_rows_to_delete = 22000
#         photos_to_delete = PhotoData.objects.order_by('id').values_list('id', flat=True)[:total_rows_to_delete]
        
#         # Delete the first 22,000 rows
#         PhotoData.objects.filter(id__in=photos_to_delete).delete()
#         self.stdout.write(self.style.SUCCESS(f'Successfully deleted {total_rows_to_delete} rows.'))


import random
from django.core.management.base import BaseCommand
from visualvibes.models import PhotoData, User

class Command(BaseCommand):
    help = 'Randomly assign usernames and user_ids from User table to PhotoData table'

    def handle(self, *args, **kwargs):
        # Fetch all User records
        users = list(User.objects.all())  # Convert to list to support random.choice
        if not users:
            self.stdout.write(self.style.WARNING('No users found in the User table.'))
            return

        # Fetch PhotoData entries that do not have a user_id set
        photo_data_entries = PhotoData.objects.filter(user_id__isnull=True)

        for entry in photo_data_entries:
            # Randomly select a user
            user = random.choice(users)
            
            # Update the username and user_id fields
            entry.username = user.username
            entry.user_id = user.user_id
            entry.save()

        self.stdout.write(self.style.SUCCESS('Successfully updated PhotoData table with random usernames and user_ids!'))
