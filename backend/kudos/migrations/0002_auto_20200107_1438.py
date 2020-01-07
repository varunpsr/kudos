# Generated by Django 3.0.2 on 2020-01-07 09:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kudos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kudos',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 1, 7, 14, 38, 2, 92587), editable=False, verbose_name='created_date'),
        ),
        migrations.AlterField(
            model_name='kudos',
            name='modified_date',
            field=models.DateTimeField(auto_now=True, verbose_name='modified_date'),
        ),
        migrations.AddIndex(
            model_name='kudos',
            index=models.Index(fields=['week_year', 'from_user'], name='kudos_kudos_week_ye_b5046e_idx'),
        ),
    ]
