# Generated by Django 5.0.2 on 2024-03-03 15:11

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Auth', '0003_alter_customuser_options_alter_customuser_managers_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='TokenBlacklist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=500)),
                ('blacklisted_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]