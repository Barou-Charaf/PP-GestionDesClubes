import React, { useState } from 'react'
import Header from '../landing/Components/Header'
import Test from '../../assets/two6.png'
import Test2 from '../../assets/two5.jpeg'
import BigFooter from "../BigFooter"
import { useNavigate } from 'react-router-dom'

import DisplayEventAnnounce from "../events/components/DisplayEventAnnounce"


export default function AllAnnouncements() {
   const navigate = useNavigate();
    const [events ,setEvents]=useState([
        {
            images:[Test],
            title:"announcement",
           departement:"Depart informatique"
        },
        {
            images:[Test],

            title:"this is just a title",
           departement:"Depart informatique"
        },
        {
                        images:[Test],

            title:"this is just a title",
           departement:"Depart informatique"
        },
        {
                        images:[Test],

            title:"this is just a title",
           departement:"Depart informatique"
        },
        {
                        images:[Test],

            title:"this is just a title",
           departement:"Depart informatique"
        },
        {
                        images:[Test],

            title:"this is just a title",
           departement:"Depart informatique"
        },
        {
                        images:[Test],

            title:"this is just a title",
           departement:"Depart informatique"
        },
    ])
    
    const handelEventClick =(EventId)=>{
      navigate(`/Announcements/${EventId}`)
    }

  return (
        <>
        <section
        className='px-5 py-2 pt-5 bg-gray-100'
        ><Header /> </section>


          
        <main
        className='bg-gradient-to-b from-[#0095ff32] to-white min-h-[70vh]  relative
        before:content-["ENSET"] before:content-start before:text-[400px] before:text-[white]  before:size-[100%] before:z-20 before:absolute  before:flex before:justify-center before:tracking-widest before:-translate-y-10 before:text-center  before:left-0 before:border-l-8
        '
        >


       <div className='w-full h-fit pt-50 px-6 justify-content-evenly z-50 relative '>    
       {
        events.length!=0 ? events.map((ele,index)=>{
          return <DisplayEventAnnounce key={index} event={ele} clicked={handelEventClick} />
        })
        :
        <p> nothing </p>
       }
       </div> 
       <BigFooter />
        </main>
        </>
  )
}
