# Generated by Django 5.1 on 2024-09-20 07:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('visualvibes', '0010_alter_user_followers_alter_user_following'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photodata',
            name='firstname',
        ),
        migrations.RemoveField(
            model_name='photodata',
            name='lastname',
        ),
    ]
