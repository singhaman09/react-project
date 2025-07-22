import React from 'react'
import { useState } from 'react'

const ControlledForm = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange=(e)=>{

        const{name,value}=e.target
        setForm((prev) => ({ ...prev ,[name]:value}))

    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(form.name && form.email && form.password){
            alert(`Submitted: ${JSON.stringify(form)}`);
        }
        else{
            alert('Please fill all fields.')
        }

    }


    return (
        <div className="form-container">
            <h2>Controlled Form</h2>
            <form onSubmit={handleSubmit}> 
                <input type='text' name='name' placeholder='name' value={form.name} onChange={handleChange} className='input' />
                <input type='email' name='email' placeholder='email' value={form.email} onChange={handleChange} className='input'/>
                <input type='password' name='password' placeholder='password' value={form.password} onChange={handleChange} className='input'/>

                <button type='submit'>Submit</button>
            </form>
            <div className='output'>  
                <h3>Entered Values:</h3>
                <p>Name: {form.name}</p>
                <p>Email: {form.email}</p>
                <p>Password: {form.password}</p>

            </div>
        </div>
    )
}

export default ControlledForm;
