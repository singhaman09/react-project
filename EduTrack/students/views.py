from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import Students
from .forms import StudentForm
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from .permissions import IsAdmin
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import logout
from django.contrib.auth.views import PasswordResetView
from django.core.mail import send_mail
from django.conf import settings

@login_required
def index(request):
    return render(request, 'students/index.html', {
        'students': Students.objects.all()
    })


@login_required
def view_student(request, id):
    student = Students.objects.get(pk=id)
    return HttpResponseRedirect(reverse('index'))


@login_required
def add(request):
    if request.method == 'POST':
        form = StudentForm(request.POST)
        if form.is_valid():
            new_student_number = form.cleaned_data['student_number']
            new_first_name = form.cleaned_data['first_name']
            new_last_name = form.cleaned_data['last_name']
            new_email = form.cleaned_data['email']
            new_field_of_study = form.cleaned_data['field_of_study']
            new_gpa = form.cleaned_data['gpa']

            new_student = Students(
                student_number=new_student_number,
                first_name=new_first_name,
                last_name=new_last_name,
                email=new_email,
                field_of_study=new_field_of_study,
                gpa=new_gpa
            )
            new_student.save()
            return render(request, 'students/add.html', {
                'form': StudentForm(),
                'success': True
            })
    else:
        form = StudentForm()
    return render(request, 'students/add.html', {
        'form': StudentForm()
    })


@login_required
def edit(request, id):
    if request.method == 'POST':
        student = Students.objects.get(pk=id)
        form = StudentForm(request.POST, instance=student)
        if form.is_valid():
            form.save()
            return render(request, 'students/edit.html', {
                'form': form,
                'success': True
            })
    else:
        student = Students.objects.get(pk=id)
        form = StudentForm(instance=student)
    return render(request, 'students/edit.html', {
        'form': form
    })


@login_required
def delete(request, id):
    if request.method == 'POST':
        student = Students.objects.get(pk=id)
        student.delete()
    return HttpResponseRedirect(reverse('index'))


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        role = request.data.get('role', 'student')

        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, role=role)
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class AdminOnlyView(APIView):
    permission_classes = [IsAdmin]  # Apply the IsAdmin permission

    def get(self, request):
        return Response({"message": "This is an admin-only view"})


# Login Page View
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Add a success message after login
            messages.success(request, 'Welcome back, {}'.format(user.username))
            return redirect('/students/')  # Redirect to students CRUD
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'students/login.html')
# def logout_view(request):
#     logout(request)
#     return redirect('/login-page/')

# Token API View (provided by DRF-SimpleJWT)
class LoginAPIView(TokenObtainPairView):
    pass


class ProtectedEndpoint(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You have accessed a protected endpoint!"})


class CustomPasswordResetView(PasswordResetView):
    def send_mail(self, subject, email_template_name, context, from_email, to_email, **kwargs):
        subject = "Reset Your Password"
        message = f"Click the link below to reset your password:\n\n{context['protocol']}://{context['domain']}{context['path']}"
        send_mail(subject, message, settings.EMAIL_HOST_USER, [to_email], fail_silently=False)
