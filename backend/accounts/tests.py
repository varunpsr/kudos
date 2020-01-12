from django.test import TestCase
from rest_framework.test import APIClient
import requests
import json
from .models import UserProfile, Organization
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

# Create your tests here.

class UserProfileTest(TestCase):

    def setUp(self):
        varun = User.objects.create_user(username="varun", email="varun@gmail.com", password="varun")
        saurabh = User.objects.create_user(username="saurabh", email="saurabh@outlook.com", password="saurabh")
        varun.first_name="Varun"
        varun.last_name="Rathore"
        varun.save()
        recruiter_box = Organization.objects.create(name="Recruiter Box")
        google = Organization.objects.create(name="Google")
        varun_profile = UserProfile.objects.create(user=varun, organization=recruiter_box)
        saurabh_profile = UserProfile.objects.create(user=saurabh, organization=recruiter_box)
        varun_token = Token.objects.create(user=varun)
        saurabh_token = Token.objects.create(user=saurabh)


    def test_full_name(self):
        varun = User.objects.get(username="varun")
        self.assertEqual(varun.get_full_name(), "Varun Rathore")

    def test_list_users_count(self):
        varun = User.objects.get(username="varun")
        token = Token.objects.get(user=varun)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        result = client.get('/accounts/users/', format='json')
        profiles = json.loads(result.content)
        self.assertEqual(len(profiles), 1)

    def test_list_users_not_include_current_user(self):
        varun = User.objects.get(username="varun")
        varun_profile = UserProfile.objects.get(user=varun)
        token = Token.objects.get(user=varun)
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        result = client.get('/accounts/users/', format='json')
        profiles = json.loads(result.content)
        has_current_user = False
        for profile in profiles:
            if profile.get('id') == varun_profile.id:
                has_current_user = True
                break
        self.assertEqual(has_current_user, False)
