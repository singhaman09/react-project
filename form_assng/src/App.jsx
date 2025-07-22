import './App.css'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
// import { getDatabase ,ref,set} from 'firebase/database'
import {app} from "./firebase"
import ControlledForm  from './components/ControlledForm'
import UnControlledForm  from './components/UnControlledForm'
import UncontrolledFormWithForwardRef from './components/UncontrolledFormWithForwardRef'
import ControlledFormCustom from './components/ControlledFormCustom'
import UncontrolledFormWithForwardRefwithcustom from './components/UncontrolledFormWithForwardRefwithcustom'

const auth=getAuth(app);

function App(){
  const signupuser=()=>{
    createUserWithEmailAndPassword(
      auth,
      "test@gmail.com",
      "aman@123"
    )
    .then((value)=> console.log(value));
    
  }

// const db=getDatabase(app);
// function App() {

//   const putData=()=>{
//     set(ref(db,'users/aman'),{
//       id:1,
//       name:"Aman",
//       age:22
//     });
//   };

  return (
    <div className='App'>
      <h1>firebase</h1>
      <button onClick={signupuser}> Create User</button>
    {/* <ControlledForm/> */}
    {/* <UnControlledForm/> */}
    {/* <UncontrolledFormWithForwardRef/> */}
    {/* <ControlledFormCustom/> */}
    {/* <UncontrolledFormWithForwardRefwithcustom/> */}

    </div>
  )
};
export default App
  