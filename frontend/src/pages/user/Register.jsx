import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../redux/features/auth/authApi'


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [registerUser,{isLoading}]= useRegisterUserMutation()
    const navigate =useNavigate()
    const handleRegister=async(e)=>{
      e.preventDefault();
      const data = {
        username,
        email,
        password
      }
      try {
        await registerUser(data).unwrap();
        alert("Regstration successfully.");
        navigate("/register")
      } catch (error) {
        setMessage("Registrantion failed!")
        alert("Registrantion failed!!")
      }
    }
  return (
    <div className='max-w-sm bg-white mx-auto p-8 mt-36'>
        <h2 className='text-2xl font-semibold pt-5'>Register</h2>
        <form onSubmit={handleRegister} action="" className="space-y-5 max-w-sm mx-auto pt-8">
            <input onChange={(e)=>setUsername(e.target.value)} type="text" value={username} placeholder='username' required className='w-full bg-bgPrimary focus:outline-none px-5 py-3' />
            <input onChange={(e)=>setEmail(e.target.value)}type="email" value={email} placeholder='Email' required className='w-full bg-bgPrimary focus:outline-none px-5 py-3' />
            <input onChange={(e)=>setPassword(e.target.value)} type="password" value={password} placeholder='Password' required className='w-full bg-bgPrimary focus:outline-none px-5 py-3' />
            {
                message && <p className='text-red-500'>{message}</p>
            }
            <button className='w-full mt-5 h-12 bg-primary hover:bg-indigo-500 text-white font-medium rounded-md'>Register</button>
        </form>
        <p className='my-5 text-center'> Have an account? <Link className='text-red-700 italic' to='/login'>Login</Link></p>
    </div>
  )
}

export default Register