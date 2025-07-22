import React from 'react'
import { useRef } from 'react'
import Input from './CustomInput'

const UncontrolledFormWithForwardRef = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (name && email && password) {
            console.log({ name, email, password });
        } else {
            alert('Please fill all fields');
        }   
    };

  return (


   <div className="form-container">
    <h2>Uncontrolled Form with forwardRef</h2>
    <form onSubmit={handleSubmit}>
        <Input type='text' ref={nameRef} placeholder='Name' className='input'/>
        <Input type='email' ref={emailRef} placeholder='Email' className='input'/>
        <Input type='password' ref={passwordRef} placeholder='Password' className='input'/>

        <button type='submit'>Submit</button>
    </form>
   </div>
  )
}


export default UncontrolledFormWithForwardRef
