from django.contrib import admin
from .models import UserProfile, Organization

# Register your models here.
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'organization', ]


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['name', ]
