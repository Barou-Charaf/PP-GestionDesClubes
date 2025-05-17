import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <section
    className= 'text-center w-[calc(98vw)] relative  top-[100%] flex flex-col flex-wrap  gap-5 items-center'
    >
       <div
       className=' text-gray-400 leading-7  text-sm pb-25'
       >
       "Clubs are legacies of vision and unity, where each generation ignites new ideas,<br /> reshapes the past, and lays the foundation for those yet to come." 
        </div> 
        <div
        className='
        relative
        before:content-[""] before:h-[120%] before:w-[80%]  before:left-1/2 before:bg-gray-200 before:opacity-90 before:absolute before:-translate-x-1/2 before:translate-y-1/2  before:-top-10/12
        before:-z-10
        before:rounded-[50%] 
             after:content-[""] after:absolute after:right-10  after:-top-3/7 after:size-30 after:border-2 after:border-amber-400 after:rounded-full 
       
        flex items-center bg-violet-600 w-full py-25 justify-evenly gap-10'
        >
            <p
            className='text-[#ffffffa6]'
            >
            Join a Club, Ignite Your <span
            className='text-white'
            >Future! </span> 
            </p>
            <button
            className='btn border rounded-full relative
              before:content-[""] before:absolute before:-right-30  before:top-5/7 before:size-20 before:border-2 before:border-amber-400 before:rounded-full 
            '
            >
                <Link to="/login">Log In</Link>
            </button>
        </div>
        <div className='flex  w-full justify-between items-center p-4 bg-gray-100'>
          <div className='flex gap-5'>
          <span className='size-10 flexCenter rounded-full border-amber-400 border-[0.09rem]  text-violet-600'><a href="https://facebook.com" >
                  f
          </a></span>
          <span className='size-10'>f</span>
          <span className='size-10'>f</span>
          <span className='size-10'>f</span>
          </div>
          <p
          className='text-gray-500 text-[.8rem]'
          >
          COPYRIGHT &copy; 2025 - <u>TERMS & CONDITIONS  PRIVACY POLICY</u>
          </p>
          <div></div>
        </div>
    </section>
  )
}
