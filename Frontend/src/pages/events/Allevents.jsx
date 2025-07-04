import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from '../landing/Components/Header';
import BigFooter from '../BigFooter';
import DisplayEventAnnounce from './components/DisplayEventAnnounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Contex } from "../../App";

export default function Allevents() {
  const navigate = useNavigate();
  const { login } = useContext(Contex);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['activities', searchTerm],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/api/activities`, {
        params: { search: searchTerm }
      });
      return res.data.data;
    },
  });

  const handelEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <>
      <section className="px-5 py-2 pt-5 bg-gray-100">
        <Header login={login} />
      </section>

      <main className="bg-gradient-to-b from-[#0095ff32] to-white min-h-[70vh] relative
           before:content-['ENSET'] before:text-[400px] before:text-white
           before:z-10 before:absolute before:flex before:justify-center
           before:tracking-widest before:-translate-y-10 before:text-center
           before:left-0 before:border-l-8">
        
        {/* Search Input */}
        <div className='flex justify-center z-[10000] h-20 w-fit right-0 absolute top-0 mb-20'>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder='Search Event By Name'
            className='h-10 w-80 my-10 mr-6 rounded-2xl text-sm text-gray-400 bg-white border-1 border-gray-300 placeholder:text-[.7rem] placeholder:text-gray-300 pl-5 focus:outline-1'
          />
        </div>

        <div className="w-full h-fit flex px-6 gap-10 z-20 relative pt-30 pb-20">
          {isLoading && (
            <div className="flex justify-center w-full text-center text-green-400 items-center py-10 mt-50">
              <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            </div>
          )}

          {isError && (
            <p className="text-center text-gray-400 py-10  w-full">
              Nothing found.
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
       <div className='w-full h-fit pt-30'>
        <BigFooter />
        </div>
      </main>
    </>
  );
}
