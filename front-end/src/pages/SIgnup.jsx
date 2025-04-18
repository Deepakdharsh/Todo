import React, { useState } from 'react'
import api from '../api/axiosInstance'
import {useNavigate} from "react-router-dom"

function Signup() {
  const navigate=useNavigate()
  const [form] = useState({
    username:"",
    email:"",
    password:""
  })

  function handleChange(e){
    form[e.target.id]=e.target.value
  }

 async function handleSubmit(e){
    e.preventDefault()
    const res=await api.post("/user/signup",form)
    console.log(res)
    if(res){
      navigate("/login")
    }
  }

  return (
    <div className='bg-[#706D54] w-full h-screen flex justify-center items-center'>
      <div className='bg-[#A08963] flex flex-col  items-center w-[400px] h-[400px] rounded'>
        <h2 className='text-xl p-8 font-bold'>SignIn</h2>
        <form action="">
        <label htmlFor="username">userName</label>
        <br />
        <input id='username' onChange={handleChange} type="text" className='bg-white border-none rounded'/>
        <br />
        <label htmlFor="email">email</label>
        <br />
        <input id='email' type="text" onChange={handleChange} className='bg-white border-none rounded'/>
        <br />
        <label htmlFor="password">password</label>
        <br />
        <input id='password' type="text" onChange={handleChange} className='bg-white border-none rounded'/>
        <br />
        </form>
        <button onClick={handleSubmit} className='bg-[#706D54] py-2 px-4 rounded mt-10'>submit</button>
      </div>
    </div>
  )
}

export default Signup