import React from 'react'
import { useRef } from 'react'



const UnControlledForm = () => {

    const nameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();
    const submitRef=useRef();

    const handleSubmit=(e)=>{
        e.preventDefault();
        // nameRef.current.focus();
        const name=nameRef.current.value
        const email=emailRef.current.value
        const password=passwordRef.current.value

        if(name &&email && password){
            console.log({name,email,password});
            
        }
        else{
            alert("Please fill all fields")
        }

    }

    function firstKeyDown(e){
        if(e.key==="Enter"){
        emailRef.current.focus();
        }
    }
    function lastKeyDown(e){
        if(e.key==="Enter"){
        passwordRef.current.focus();}
    }
    function passKeyDown(e){
        if(e.key==="Enter"){
        submitRef.current.focus();}
    }
    function submitKeyDown(e){
        if(e.key==="Enter"){
        nameRef.current.focus();}
    }


  return (
    <div className='form-container'>
        <h2>Uncontrolled Form</h2>
        <form onSubmit={handleSubmit}>
            <input type='text' onKeyDown={firstKeyDown} ref={nameRef} placeholder='Name' className='input'></input>
            <input type='email' onKeyDown={lastKeyDown} ref={emailRef} placeholder='Email' className='input'></input>
            <input type='password' onKeyDown={passKeyDown} ref={passwordRef} placeholder='Password' className='input'></input>

            <button type='submit' ref={submitRef} onKeyDown={submitKeyDown}  className='submit'>Submit</button>
        </form>
    </div>
  )
}

export default UnControlledForm
