import pytest
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_create_user():
    user = User.objects.create_user(username='dbtest', password='password123')
    assert User.objects.filter(username='dbtest').exists()
