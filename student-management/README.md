🏫 Student Management System (React + Redux)

A simple Student Management System built with React, Redux, and React Router. This project allows users to add, edit, delete, and list students dynamically with validation and smooth UI interactions.

🚀 Features

✅ Add New Student – Fill out a form with validation.
✅ Edit Existing Student – Modify details with real-time form validation.
✅ Delete Student – Shows a confirmation popup before deletion.
✅ Success Messages – Displays success messages after adding, editing, or deleting.
✅ Redux State Management – Handles students’ data efficiently.
✅ React Router Navigation – Navigate seamlessly between pages.
✅ Minimal & Responsive UI – Simple design with CSS styling.
✅ Dark/Light Mode


🛠 Tech Stack
React.js – Frontend UI

Redux Toolkit – State management

React Router – Navigation

CSS – Basic styling

React toastify -- Notification

📂 Project Structure

📦 STUDENT-MANAGEMENT
 ┣ 📂 src  
 ┃ ┣ 📂 components  
 ┃ ┃ ┗ 📜 StudentForm.jsx  
 ┃ ┃ ┗ 📜 ThemeToggle.jsx  
 ┃ ┣ 📂 pages  
 ┃ ┃ ┗ 📜 Home.jsx  
 ┃ ┣ 📂 redux  
 ┃ ┃ ┗ 📜 studentSlice.js  
 ┃ ┃ ┗ 📜 store.js  
 ┃ ┣ 📜 App.jsx  
 ┃ ┣ 📜 main.jsx
 ┃ ┣ 📜 styles.css  
 ┣ 📜 package.json  
 ┣ 📜 README.md  


 🎯 Installation & Setup

 
    1️⃣ Clone the repository
        git clone https://github.com/singhaman09/Student-Management.git
        cd student-management  

    2️⃣ Install dependencies

        npm install redux react-redux @reduxjs/toolkit react-router-dom 
    
    3️⃣ Run the development server

        npm run dev  
        👉 The app will be available at  https://student-management-vert-eight.vercel.app/

🔥 Usage


    ➕ Add Student
        
        Click on "Add Student"
        Fill in the name, email, phone, gender, and department
        Click "Save" (Success message appears)

    ✏️ Edit Student

        Click the "Edit" button
        Modify the details
        Click "Save" (Success message appears)

    🗑️ Delete Student
       
        Click the "Delete" button
        Confirm the deletion in the popup
        Student is removed, and a success message appears

🤝 Contributing
    
    Contributions are welcome! Fork the repo and submit a PR.