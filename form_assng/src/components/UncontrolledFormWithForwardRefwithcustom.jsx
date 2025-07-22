import React, { useRef } from 'react';
import CustomInput from './CustomInput';

const UncontrolledFormWithForwardRefwithcustom = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
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
      <h2>Uncontrolled Form with Custom Input</h2>
      <form onSubmit={handleSubmit}>
        <CustomInput type="text" ref={nameRef} placeholder="Name" />
        <CustomInput type="email" ref={emailRef} placeholder="Email" />
        <CustomInput type="password" ref={passwordRef} placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledFormWithForwardRefwithcustom;