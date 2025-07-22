from django.urls import path
from . import views
from .views import RegisterView, LoginView, AdminOnlyView, ProtectedEndpoint
from django.contrib.auth import views as auth_views
from django.urls import path
from .views import CustomPasswordResetView



urlpatterns = [
    path('', views.index, name="index"),  # Main CRUD page
    path('<int:id>/', views.view_student, name='view_student'),  # View student details
    path('add/', views.add, name='add'),  # Add student
    path('edit/<int:id>/', views.edit, name='edit'),  # Edit student
    path('delete/<int:id>/', views.delete, name='delete'),  # Delete student
    path('register/', RegisterView.as_view(), name='register'),  # Registration API
    path('login-page/', views.login_view, name='login-page'),  # Login page
    path('api/login/', LoginView.as_view(), name='api-login'),  # Login API
    path('admin-only/', AdminOnlyView.as_view(), name='admin-only'),  # Admin-only API
    path('api/protected-endpoint/', ProtectedEndpoint.as_view(), name='protected-endpoint'),  # Protected endpoint
    path('password-reset/', CustomPasswordResetView.as_view(), name='password_reset'),

]
urlpatterns += [
    # Password reset views
    path('password-reset/', auth_views.PasswordResetView.as_view(template_name='students/password_reset.html'), name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='students/password_reset_done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='students/password_reset_confirm.html'), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='students/password_reset_complete.html'), name='password_reset_complete'),
]