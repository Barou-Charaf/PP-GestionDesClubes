import React from 'react';
import Header from '../landing/Components/Header';
import BigFooter from "../BigFooter";
import { useNavigate } from 'react-router-dom';
import DisplayEventAnnounce from "../events/components/DisplayEventAnnounce";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function AllAnnouncements({ clubId }) {
  const navigate = useNavigate();

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ['all-announcements'],
    queryFn: () =>
      axios
        .get('http://localhost:8000/api/announcements', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const raw = res.data?.data || [];
          return raw.map((item) => ({
            ...item,
            images: item.image ? [item.image] : [], // ✅ fix here
            departement: "Depart informatique",     // or fetch dynamically
          }));
        }),
  });

  const handelEventClick = (EventId) => {
    navigate(`/Announcements/${EventId}`);
  };

  return (
    <>
      <section className='px-5 py-2 pt-5 bg-gray-100'>
        <Header />
      </section>

      <main
        className='bg-gradient-to-b from-[#0095ff32] to-white min-h-[70vh] relative
        before:content-["ENSET"] before:content-start before:text-[400px] before:text-[white]  before:size-[100%] before:z-20 before:absolute  before:flex before:justify-center before:tracking-widest before:-translate-y-10 before:text-center  before:left-0 before:border-l-8'
      >
        <div className='w-full h-fit pt-50 px-6 justify-content-evenly z-50 relative mb-30'>
          {isLoading ? (
            <p className='text-center text-gray-500 py-10'>Loading...</p>
          ) : isError ? (
            <p className='text-center text-red-500 py-10'>Error: {error.message}</p>
          ) : data.length !== 0 ? (
            data.map((ele, index) => (
              <DisplayEventAnnounce key={index} event={ele} clicked={handelEventClick} />
            ))
          ) : (
            <p className='text-center text-gray-500 py-10'>Nothing</p>
          )}
        </div>

        <BigFooter />
      </main>
    </>
  );
}
