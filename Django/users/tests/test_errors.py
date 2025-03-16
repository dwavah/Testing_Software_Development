# users/tests/test_errors.py

import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth.models import User

pytestmark = pytest.mark.django_db

class TestAuthErrorHandling:

    def setup_method(self):
        self.client = APIClient()

    def test_registration_missing_fields(self):
        url = reverse('register')
        response = self.client.post(url, {}, format='json')
        assert response.status_code == 400

    def test_login_wrong_credentials(self):
        User.objects.create_user(username='testuser', email='test@example.com', password='correctpass')
        url = reverse('login')
        response = self.client.post(url, {"username": "testuser", "password": "wrongpass"}, format='json')
        assert response.status_code == 400
        assert 'non_field_errors' in response.data
