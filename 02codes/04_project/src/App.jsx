import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";


function App(){
  return(
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}>

          </Route>
          <Route path='/about' element={<About></About>}>

          </Route>
          <Route path='/contact' element={<Contact></Contact>}>

          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;