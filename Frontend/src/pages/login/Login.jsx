import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import loginImage from "../../assets/Login.png"
import { Link } from 'react-router-dom'
import { Contex  } from '../../App'

import Cookies from 'js-cookie'; 

import { useNavigate } from 'react-router-dom'


export default function Login() {
  const navigate = useNavigate();

  const {role,setRole}=useContext(Contex)
  const [postResponse,setPostResponse]=useState(null);

  const shema = yup.object().shape({
     email:yup.string().email("must be an Email..").required("This field is required"),
     password:yup.string().min(4,"Invalid password").max(30,"too much caracters for a Password").required("This field is required")
  });

  const {handleSubmit,register,formState:{errors}}=useForm({
    resolver:yupResolver(shema)
  });

const onSubmit = (data) => {
  axios.post('http://127.0.0.1:8000/api/login', data)
    .then(response => {
      const { token, user } = response.data;

      // Save token to cookies
      Cookies.set('auth_token', token, { expires: 7 }); // expires in 7 days

      //  Redirect based on role
      setRole(user.role);
      
      if (user.role === "super_admin") {
        navigate("/admin");
      } else if (user.role=== "admin_club") {
        navigate(`/clubs/${user.club_id}`); // or wherever non-admins go
      }
    })
    .catch(error => {
      console.error('Login failed:', error);
    });
};

  return (
    <main
    className='w-screen md:px-10 md:py-10 md:bg-gradient-to-r md:from-[#1c1d21] md:from-50% md:to-50% md:to-purple-600    text-gray-300 flex flex-col md:flex-row-reverse '
    >
      <section  className=' relative bg-purple-600 md:bg-transparent md:w-1/2 w-full flex flex-col md:h-[100vh]  justify-evenly items-center  md:shadow-2xl md:rounded-r-4xl md:p-0 py-10 px-2'
      >
       <span
       className='z-20'
       >
       <h1
        className='potato-container   before:top-0 before:left-0 before:size:40  after:top-0 after:right-0  text-6xl font-bold'
        >
          Welcom to <br /><span
          className='potato-container after:top-40 after:right-20 before:top-20 before:left-50 font-normal'
          > Enset's Clubs</span>
        </h1>
        <p className='potato-container before:top-80 before:right-10 after:top-80 after:left-40 text-sm pl-1 mt-3'>login to access your ccount </p>
       </span>
        <div
        className='potato-container after:bottom-0 after:right-30 before:bottom-20 before:left-10 w-[70%] z-20'
        >
          <img src={loginImage} alt="" className='w-full h-full object-cover' />
        </div>
      </section>
    <section
    className='bg-[#1c1d21]  md:bg-transparent md:w-1/2 w-full flex flex-col md:h-[100vh]  justify-evenly items-center  shadow-[#00000082] md:drop-shadow-2xl md:shadow-2xl md:rounded-l-4xl text-gray-300  p-10 '
    >
      <form
      className='w-full md:w-[70%] flex flex-col items-center gap-15 '
      onSubmit={handleSubmit(onSubmit)}>
       <span className='w-full'>
       <h1 className='md:text-5xl text-3xl mb-5 font-extrabold w-[90%] pl-4'>Login</h1>
       <p className='text-[.8rem] w-[90%]  text-gray-500 tracking-wider pl-4 '>Enter your account details</p>
       </span>
       <span className='flex flex-col items-center gap-5 w-full'>
        <input type="text" id='email' placeholder='Email' {...register('email')} className='placeholder-gray-300 w-[90%] pb-2 outline-0 border-b-gray-600 border-b text-sm font-extralight'/>
       {
        errors.email && 
        <label htmlFor="email" className='w-[90%] text-[.7rem] text-red-400'>
        {errors.email?.message}
      </label>
       }
        <input type="text" id="password" placeholder='Password' {...register('password')} className='placeholder-gray-300 w-[90%] pb-2 outline-0 border-b-gray-600 border-b text-sm font-extralight'/>
        {
        errors.password && 
        <label htmlFor="password" className='w-[90%] text-[.7rem] text-red-400'>
        {errors.password?.message}
      </label>
       }
        <p className='text-[.7rem] w-[90%]'>Forget password?</p>
        <button
        className='btn w-[92%] my-3 mx-auto bg-purple-600 py-2'
        >
          Login
        </button>
       </span>
      </form>
      <div className=' w-full md:w-[65%] text-[.7rem] flex font-light sm:flex-row gap-5 flex-col justify-between items-center'>
        <p>Don't have an account?</p>
        <button
        className='btn w-full md:w-fit text-[.7rem] bg-gray-700 active:opacity-70 py-[.4rem] opacity-50'
        >Sign up</button>
      </div>
    </section>
  
     {/* <Link to="/">
     <span
    className='btn rounded-full size-12 bg-purple-500 shadow-2xl shadow-gray-500 text-[.6rem] absolute top-20 left-20 p-0 animate-bounce'
    >
     Back 
    </span>
     </Link> */}

    </main>
  )
}
