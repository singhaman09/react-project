import './App.css'
import { createContext, useState } from 'react'
import ChildA from './components/ChildA'
 
//create context
const UserContext=createContext();

//step 2 =  wrap all child inside a provider

//step 3 pass value

//step 4 = consumer k andr consume kar lo

function App() {
  const [user,setUser]=useState({name:"Aman"});
  

  return (
    <>
     <UserContext.Provider value={user}>
      <ChildA/>
      </UserContext.Provider>

    </>
  )
}

export default App
export {UserContext}
