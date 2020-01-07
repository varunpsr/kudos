from django.contrib import admin
from .models import Kudos

# Register your models here.

@admin.register(Kudos)
class KudosAdmin(admin.ModelAdmin):
    list_display = ['from_user', 'to_user', 'body', 'created_date', 'modified_date', 'week_year']
    search_fields = ['from_user', 'to_user', 'body']