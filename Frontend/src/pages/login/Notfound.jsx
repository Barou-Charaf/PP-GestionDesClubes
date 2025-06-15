import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
       <div className='flex justify-end pt-10 pr-10 items-self-start  '>
      <Link to="/" className="mt-4 btn w-fit rounded-full  bg-black  ">
           GO Back Home
          </Link>

    </div>
    
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-white text-gray-800">
   
      <div className="flex items-center space-x-4">
        <p className="text-3xl font-semibold border-r pr-4 border-gray-400">404</p>
        <div className="flex flex-col">
          <p className="text-xl">This page could not be found.</p>
         
        </div>
      </div>
    </div>
    </>
  );
}