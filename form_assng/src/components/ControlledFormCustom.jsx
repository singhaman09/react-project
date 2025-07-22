import React, { useState } from 'react';
import CustomInput from './CustomInput';

const ControlledFormCustom = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      alert(`Submitted: ${JSON.stringify(formData)}`);
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="form-container">
      <h2>Controlled Form with Custom Input</h2>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <CustomInput
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <CustomInput
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="output">
        <h3>Entered Values:</h3>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Password: {formData.password}</p>
      </div>
    </div>
  );
};

export default ControlledFormCustom;