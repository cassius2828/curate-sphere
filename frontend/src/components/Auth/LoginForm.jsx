import React from 'react'
import { login } from '../../services/authService';


const LoginForm = () => {
    let formData = ''
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(formData)
            console.log('user logged in successfully')
        } catch (error) {
            console.log(error, 'error')
        }
    }

  return (
    <>
    <div>LoginForm</div>
    <button onClick={(e)=>handleSubmit(e)}>Log In</button>
    </>
  )
}

export default LoginForm