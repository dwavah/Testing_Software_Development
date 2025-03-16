# users/tests/test_integration.py

import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth.models import User

pytestmark = pytest.mark.django_db  # Ensure access to DB for tests

class TestUserIntegration:

    def setup_method(self):
        self.client = APIClient()

    def test_user_registration_and_query(self):
        # Register user
        register_url = reverse('register')
        user_data = {
            "username": "integration_user",
            "email": "integration@example.com",
            "password": "IntegrationPass123"
        }
        register_response = self.client.post(register_url, user_data, format='json')
        assert register_response.status_code == 201
        assert User.objects.filter(username='integration_user').exists()

        # Query user directly from DB (integration check)
        user = User.objects.get(username='integration_user')
        assert user.email == "integration@example.com"

    def test_user_login_and_token(self):
        # Setup user directly
        User.objects.create_user(username='integration_user', email='integration@example.com', password='IntegrationPass123')

        # Login user
        login_url = reverse('login')
        login_response = self.client.post(login_url, {"username": "integration_user", "password": "IntegrationPass123"}, format='json')
        assert login_response.status_code == 200
        assert 'token' in login_response.data
