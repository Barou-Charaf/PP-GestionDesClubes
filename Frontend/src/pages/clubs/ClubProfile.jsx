import React, { useState } from 'react'
import Header from '../landing/Components/Header'
import K from "../../assets/emiu.png" 
import BigFooter from "../BigFooter"
import Test from '../../assets/two6.png'
import Test2 from '../../assets/two5.jpeg'
import DisplayEventAnnounce from "../events/components/DisplayEventAnnounce"
import ModifieProfile from './modifieProfile'
import AddEvent from "./AddEvent"
import AddAnouce from "./AddAnounce"
import RoomResrvation from './RoomResrvation'
import MaterialReservation from './MaterialReservation'

export default function ClubProfile() {
    const [login, setLogin]=useState(true);
    const [edit,setEdit]=useState(false)
    const [materiel,setMateriel]=useState(false)
    const [room,setRoom]=useState(false)
    const [event,setEvent]=useState(false)
    const [anouc,setAnouce]=useState(false)

    const reservations = [
      { id: 1, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
      { id: 2, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
      { id: 3, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
      { id: 4, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
      { id: 5, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
      { id: 6, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
      { id: 7, room: 'Room 2', club: '[Club Name]', reason: 'YY', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
      { id: 8, room: 'Room 2', club: '[Club Name]', reason: 'YY', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
    ];

    const materielReservations=[
        { id: 1, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
        { id: 2, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
        { id: 3, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
        { id: 4, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
        { id: 5, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
        { id: 6, room: 'Room 1', club: '[Club Name]', reason: 'XX', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
        { id: 7, room: 'Room 2', club: '[Club Name]', reason: 'YY', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
        { id: 8, room: 'Room 2', club: '[Club Name]', reason: 'YY', date: 'DD/MM/YYYY', startTime: 'HH:MM', endTime: 'HH:MM' },
    ];
    const [club, setClub]=useState({
        name:"Club Name",
        startat:2000,
        description: "        On May 9, 2025, the Computer Engineering Club proudly hosted TechTalk 2025, a landmark event that brought together brilliant minds, bold ideas, and a shared passion for technology. Held in the ENSET Auditorium, the event was a resounding success, drawing in over 200 participants from across departments and beyond."
    })

      const [events ,setEvents]=useState([
           {
               images:[Test,Test2,Test,Test2],
               title:"this is just a title",
              departement:"Depart informatique"
           },
           {
               images:[Test,Test2,Test,Test2],
   
               title:"this is just a title",
              departement:"Depart informatique"
           },
           {
                           images:[Test,Test2,Test,Test2],
   
               title:"this is just a title",
              departement:"Depart informatique"
           },
           {
                           images:[Test,Test2,Test,Test2],
   
               title:"this is just a title",
              departement:"Depart informatique"
           },
           {
                           images:[Test,Test2,Test,Test2],
   
               title:"this is just a title",
              departement:"Depart informatique"
           },
           {
                           images:[Test,Test2,Test,Test2],
   
               title:"this is just a title",
              departement:"Depart informatique"
           },
           {
                           images:[Test,Test2,Test,Test2],
   
               title:"this is just a title",
              departement:"Depart informatique"
           },
       ])


       const handlLoading=()=>{
        console.log('loading more data');
       }

       const handelEdit=()=>{
        setEdit(true)
       }
       const handelMateriel=()=>{
        setMateriel(true)
       }
       const handeRoom=()=>{
        setRoom(true)
       }
       const handelEvent=()=>{
        setEvent(true)
       }
       const handelAnounce=()=>{
        setAnouce(true)
       }
       

  return (
   <>
   <div className='bg-gray-100 pl-5 pt-5 pr-5'>
   <Header login={login} />
   </div>
   <main className='p-5 pt-16 bg-gradient-to-b from-[#e7f0ff] to white w-full ' >
    <div className=' flex w-full space-x-10 '>

    <section className='w-[24%] pt-10 pb-7 flex flex-col bg-gray-100 min-h-130  space-y-8 rounded-3xl items-center'>
        <img src={K} alt="" width={180} className='rounded-full' />
        <div className=' w-full text-sm px-5   items-center space-y-1 '>
            <h2 className='text-[1.4rem] font-bold w-[80%] m-auto '>
            Identity Verification
            </h2>
            <p className='text-[.8rem] w-[80%] text-gray-600 m-auto tracking-wide  mt-3 mb-3   '>
            Officially recognized by ENSET Registered under Student Affairs Department.
            </p>
            <p className='text-2xl font-bold w-[80%]  m-auto  '>
              {club.name}
            </p>
            <p className='text-gray-500 w-[80%] m-auto mt-2 mb-2 '> Email Confirmed</p>
            <p className='text-gray-500 w-[80%] m-auto'> Mobile Confirmed</p>
            <p className='text-gray-500 w-[80%] m-auto  mt-2 mb-2 '> isntagram Confirmed</p>
            <p className='text-gray-500 w-[80%] m-auto'> Linkedin Confirmed</p>

        </div>
    </section>
    <section className='w-[75%]'>
        <div className='border-b border-gray-300 pb-5'>
        <h2 className='text-3xl font-bold text-gray-700'>Hello TO [{club.name}]</h2>
        <p className='text-gray-500 text-[.8rem] pb-2 pt-2'>Active since {club.startat}</p>
        <p className='text-gray-800 text-[1.3rem]'><u>Reviewed By You</u></p>
        </div>
        <div>
         {
          login &&  <span
          className='flex p-10 pl-4 space-x-3'
           >
            <button
            onClick={handelEdit}
            className='btn text-gray-600 bg-white rounded-full border border-gray-300 hover:bg-black hover:text-white' 
            > Edit Profile</button>
             <button
             onClick={handeRoom}
            className='btn text-gray-600 bg-white rounded-full border border-gray-300 hover:bg-black hover:text-white' 
            >  Room Reservation</button>
             <button
             onClick={handelMateriel}
            className='btn text-gray-600 bg-white rounded-full border border-gray-300 hover:bg-black hover:text-white' 
            > Material Reservation </button>
            <button
            onClick={handelEvent}
            className='btn text-gray-600 bg-white rounded-full border border-gray-300 hover:bg-black hover:text-white' 
            > Add Event</button>

           <button
            onClick={handelAnounce}
            className='btn text-gray-600 bg-white rounded-full border border-gray-300 hover:bg-black hover:text-white' 
            > Add Announcement</button>

            </span>


         }
            <p
            className='text-gray-400 text-[.8rem] w-[80%] ml-40 pt-20 leading-7'
            >
             {club.description}
            </p>
        </div>
    </section>
    </div>
    <section>
     <div className=' pl-8 pb-10 pt-5 flex gap-5 '>
        <button className='btn text-gray-600 bg-white rounded-full border border-gray-300'>Anouncements</button>
        <button className='btn text-gray-50 bg-gray-950 rounded-full border border-gray-300'>Events</button>
     </div>
     <div>
        {
            events.length > 0 ? events.map((ele,index)=>{
              return <DisplayEventAnnounce event={ele} key={index} />
            })
            :
            <p>
                NO events For now
            </p>
        }
     </div>
     <p
     className='text-center p-8 font-extrabold text-gray-600'
     >
        <a 
        onClick={handlLoading}
        className='hover:underline cursor-pointer active::scale-[0.95]'
        >
            Paginations or Load on scroll...
        </a>
     </p>

    </section>
    {
        (login && edit) && <ModifieProfile edit={edit} setEdit={setEdit} />
    }
    {
        (login && materiel ) && <MaterialReservation materielReservations={materielReservations}  materiel={materiel} setMateriel={setMateriel} />
    }
    {
        (login && room) && <RoomResrvation reservations={reservations} room={room} setRoom={setRoom} />
    }
    {
        (login && event) && <AddEvent event={event} setEvent={setEvent} />
    }
     {
        (login && anouc) && <AddAnouce anouce={anouc} setAnouce={setAnouce} />
    }
   </main>
   <BigFooter />
   </>
  )
}
