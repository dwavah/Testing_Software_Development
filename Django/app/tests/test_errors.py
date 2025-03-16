import pytest
from django.urls import reverse
from rest_framework.test import APIClient

@pytest.mark.django_db
def test_invalid_login():
    client = APIClient()
    url = reverse('login')
    data = {"username": "wronguser", "password": "wrongpass"}
    response = client.post(url, data)
    assert response.status_code == 401
    assert response.data['message'] == "Invalid credentials"
