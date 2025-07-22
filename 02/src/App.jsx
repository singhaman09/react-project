import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [counter,setCounter]=useState(19);

  
  const addvalue=()=>{
    console.log("Clicked",counter);
    if(counter<20){
    counter=counter+1}
    setCounter(counter)
    
  }
  const removevalue=()=>{
    console.log("Clicked",counter);
    if(counter>0)
    {
    counter=counter-1
    }
    setCounter(counter)
    
  }
  
  
  return(
    <>
    <h1>chair aur react</h1>
    <h2>counter value:{counter}</h2>
    <button onClick={addvalue}>Add Value</button>
    <br></br>
    
    <button onClick={removevalue}>Remove value</button>
    </>
  )
}
  
export default App
