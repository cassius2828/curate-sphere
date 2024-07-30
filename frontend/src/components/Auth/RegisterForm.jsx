import React from 'react'
import { register } from '../../services/authService';

const RegisterForm = () => {
    let formData = ''
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await register(formData)
            console.log('user registered successfully')
        } catch (error) {
            console.log(error, 'error')
        }
    }

  return (
    <>
    <div>RegisterForm</div>
    <button onClick={(e)=>handleSubmit(e)}>Register</button>
    </>
    
  )
}

export default RegisterForm