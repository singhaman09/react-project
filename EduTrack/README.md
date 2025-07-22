# **EDUTRACK - Student Management System**

EDUTRACK is a Django-based web application designed to simplify the management of student data in educational institutions. It provides a secure platform for handling student records, user authentication, and password management. This project is ideal for small to medium-sized institutions and can serve as a foundation for more extensive systems.

## **Table of Contents**
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [License](#license)

## **Project Overview**
EDUTRACK is a student management system built using the Django framework. The system supports the following functionalities:
- **User Authentication:** Allows users to log in and log out securely.
- **Student Management:** Admins can add, edit, view, and delete student details.
- **Password Reset:** Supports secure password reset through email.
- **Role-Based Access Control (RBAC):** Implements access restrictions based on user roles.
- **Logout Functionality:** Users can log out and return to the login page.
- **Responsive Design:** The interface is optimized for various devices.

## **Features**
- **Login/Logout:** Secure login and logout functionality.
- **Student Records Management:** Full CRUD (Create, Read, Update, Delete) operations for student data.
- **Password Reset:** Allows users to recover their passwords via email.
- **Role-Based Access:** Admin-only features for enhanced security.
- **Navigation:** After login, users are redirected to the main dashboard.
- **Logout Button:** Redirects users to the login page upon logging out.

## **Installation**
### Prerequisites:
- Python 3.x
- Django 4.x
- pip (Python package manager)

### Steps:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/edutrack.git
2. **Navigate to the project directory:**
   ```bash
   cd edutrack
3. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
    # On Windows
    venv\Scripts\activate
    # On Mac/Linux
    source venv/bin/activate

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt

5. **Run migrations:**
   ```bash
   python manage.py makemigrations
    python manage.py migrate

6. **Create a superuser:**
   ```bash
   python manage.py createsuperuser

7. **Run the development server:**
   ```bash
   python manage.py runserver
You can now access the project by visiting http://127.0.0.1:8000/.

## **Project Structure**
- **Access the application:** Open your browser and navigate to http://127.0.0.1:8000/.
- **Student Dashboard:** After logging in, you'll be redirected to the student dashboard at [http://127.0.0.1:8000/students/], where you can perform CRUD operations on student records.
- **Login:** Use the superuser credentials to log in.
              After logging in, you'll be redirected to the student management dashboard.
- **Logout:** Click the Logout button on the dashboard to return to the login page.
- **Password Reset:** If you forget your password, you can use the password reset feature.

  ## **Installation**
  ```bash
       EDUTRACK/
    │
    ├── django_project/             # Main project folder
    │   ├── __init__.py
    │   ├── asgi.py
    │   ├── settings.py             # Django settings
    │   ├── urls.py                 # Main URL configuration
    │   ├── wsgi.py
    │
    ├── students/                   # Application folder for student management
    │   ├── migrations/             # Database migrations
    │   ├── static/                 # Static files (CSS, JS, images)
    │   ├── templates/              # HTML templates
    │   │   ├── dj_add.html
    │   │   ├── dj_base.html
    │   │   ├── dj_edit.html
    │   │   ├── dj_index.html
    │   │   └── dj_login.html
    │   ├── admin.py                # Admin panel configuration
    │   ├── apps.py                 # App configuration
    │   ├── forms.py                # Forms for handling user inputs
    │   ├── models.py               # Database models for students
    │   ├── permissions.py          # Custom permissions for access control
    │   ├── urls.py                 # URL configuration for student app
    │   ├── views.py                # Views to handle business logic
    │   └── tests.py                # Unit tests
    │
    └── requirements.txt            # Python dependencies


## **Technologies Used**
- **Backend:**Django
- **Frontend:** HTML, CSS
- **Python 3** The programming language used to build this application.
- **Database:** SQLite (default with Django)
- **Authentication:** Django's built-in authentication system
- **Additional Libraries:** Django REST Framework (if applicable)
## **Contributing**
We welcome contributions to EDUTRACK! If you'd like to contribute, please fork the repository, create a new branch, and submit a pull request with your changes.
- Fork the repository.
- Create a new branch for your feature/bug fix.
- Commit your changes and push the branch.
- Submit a pull request with a detailed explanation of your changes.

## **License:**
  This project is licensed under the MIT License - see the LICENSE file for details.










