import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDsXUktfvt8BK2O736R0lYwXE1HhsYoaI4",
    authDomain: "project1-f241d.firebaseapp.com",
    projectId: "project1-f241d",
    storageBucket: "project1-f241d.firebasestorage.app",
    messagingSenderId: "1028173707743",
    appId: "1:1028173707743:web:4a26b04b4d5901629a6c6a",
    databaseURL: "https://project1-f241d-default-rtdb.firebaseio.com/"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);