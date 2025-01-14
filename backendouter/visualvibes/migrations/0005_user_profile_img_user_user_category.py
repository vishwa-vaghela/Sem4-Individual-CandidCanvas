# Generated by Django 5.1.1 on 2024-09-13 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visualvibes', '0004_alter_user_followers_alter_user_following'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_img',
            field=models.ImageField(blank=True, null=True, upload_to='visualvibes/images'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_category',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
