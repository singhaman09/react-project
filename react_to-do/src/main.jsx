import React from "react"; //to use react component 
import ReactDOM from "react-dom/client"; //to render app into browser
import App from "./App";  //import app.jsx
import "./App.css"; //import css

ReactDOM.createRoot(document.getElementById("root")).render( //find div from index.html and render it
  <React.StrictMode>
    <App/>
  </React.StrictMode> );  //do extra check ; error checking 
