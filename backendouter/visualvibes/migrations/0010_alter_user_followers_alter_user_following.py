# Generated by Django 5.1 on 2024-09-16 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visualvibes', '0009_photodata_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='followers',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='user',
            name='following',
            field=models.IntegerField(),
        ),
    ]
