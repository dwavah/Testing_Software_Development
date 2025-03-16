import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth.models import User

@pytest.mark.django_db
class TestAuthAPI:
    def setup_method(self):
        self.client = APIClient()

    def test_user_registration(self):
        url = reverse('register')
        data = {"username": "testuser", "password": "testpass123"}
        response = self.client.post(url, data)
        assert response.status_code == 201
        assert User.objects.filter(username='testuser').exists()

    def test_user_login(self):
        User.objects.create_user(username='testuser', password='testpass123')
        url = reverse('login')
        data = {"username": "testuser", "password": "testpass123"}
        response = self.client.post(url, data)
        assert response.status_code == 200
        assert response.data['message'] == "Login successful"
