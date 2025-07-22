import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    //handle dark mode
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      //handle light mode
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
