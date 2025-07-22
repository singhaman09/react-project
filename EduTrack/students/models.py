from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Students(models.Model):
    student_number=models.PositiveIntegerField()
    first_name=models.CharField(max_length=60)
    last_name=models.CharField(max_length=60)
    email=models.EmailField(max_length=100)
    field_of_study=models.CharField(max_length=50)
    gpa=models.FloatField()

    def __str__(self):
        return f'Student: {self.first_name} {self.last_name}'
    
    
class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='students_user_set',  # Add a unique related_name
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='students_user_set',  # Add a unique related_name
        blank=True,
    )