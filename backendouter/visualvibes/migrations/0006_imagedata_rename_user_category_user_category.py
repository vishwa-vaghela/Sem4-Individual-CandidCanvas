# Generated by Django 5.1.1 on 2024-09-13 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visualvibes', '0005_user_profile_img_user_user_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=150)),
                ('username', models.CharField(max_length=150)),
                ('photo_id', models.CharField(max_length=50)),
                ('photo_image_url', models.URLField()),
                ('likes', models.IntegerField()),
                ('category', models.CharField(max_length=100)),
                ('ai_description', models.CharField(max_length=200)),
            ],
        ),
        migrations.RenameField(
            model_name='user',
            old_name='user_category',
            new_name='category',
        ),
    ]