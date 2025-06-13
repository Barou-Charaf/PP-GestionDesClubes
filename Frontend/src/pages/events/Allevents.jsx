import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from '../landing/Components/Header';
import BigFooter from '../BigFooter';
import DisplayEventAnnounce from './components/DisplayEventAnnounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {

  faSpinner
} from '@fortawesome/free-solid-svg-icons';

import {Contex} from "../../App"
import { useContext } from 'react';

export default function Allevents() {
 const navigate = useNavigate();
 const {login}=useContext(Contex);

 const {
  data: events,
  isLoading,
  isError,
  error,
 } = useQuery({ // Changed to object syntax
  queryKey: ['activities'], // Define queryKey
  queryFn: async () => { // Define queryFn
   const res = await axios.get('http://localhost:8000/api/activities');
   return res.data.data;
  },
 });

 const handelEventClick = (eventId) => {
  navigate(`/events/${eventId}`);
 };
 if (isLoading) {
    return (
      <div className="flex justify-center text-green-400 items-center py-10 mt-50">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }

 return (
  <>
   <section className="px-5 py-2 pt-5 bg-gray-100">
    <Header login={login} />
   </section>

   <main
    className="bg-gradient-to-b from-[#0095ff32] to-white min-h-[70vh] relative
         before:content-['ENSET'] before:text-[400px] before:text-white
         before:z-10 before:absolute before:flex before:justify-center
         before:tracking-widest before:-translate-y-10 before:text-center
         before:left-0 before:border-l-8
        
         "
   >
    <div className="w-full h-fit pt-12 px-6 justify-center z-20 relative  pb-20">
     {isLoading && (
      <p className="text-center text-gray-500 py-40">Loading events…</p>
     )}

     {isError && (
      <p className="text-center text-red-500 py-10">
       Error: {error.message}
      </p>
     )}

     {!isLoading && !isError && (!events || events.length === 0) && (
      <p className="text-center text-gray-500 py-10">No events found.</p>
     )}

     {!isLoading && !isError && events?.length > 0 && (
      <div className="grid gap-4 grid-cols-3">
       {events.map((ev) => (
        <DisplayEventAnnounce
         key={ev.id}
         event={ev}
         clicked={() => handelEventClick(ev.id)}
        />
       ))}
      </div>
     )}
    </div>

    <BigFooter />
   </main>
  </>
 );
}