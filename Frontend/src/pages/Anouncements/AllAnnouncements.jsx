import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Header from '../landing/Components/Header';
import BigFooter from '../BigFooter';
import DisplayEventAnnounce from '../events/components/DisplayEventAnnounce';
import { Contex } from '../../App';

export default function AllAnnouncements({ clubId }) {
  const navigate = useNavigate();
  const { login } = useContext(Contex);
  const [searchTerm, setSearchTerm] = useState('');

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ['all-announcements', searchTerm],
    queryFn: () =>
      axios
        .get('http://localhost:8000/api/announcements', {
          params: { search: searchTerm },
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const raw = res.data?.data || [];
          return raw.map((item) => ({
            ...item,
            images: item.image ? [item.image] : [],
            departement: 'Depart informatique', // Static or dynamic if needed
          }));
        }),
    keepPreviousData: true, // Optional: prevents UI flickering
  });

  const handleEventClick = (EventId) => {
    navigate(`/Announcements/${EventId}`);
  };

  return (
    <>
      <section className="px-5 py-2 pt-5 bg-gray-100">
        <Header login={login} />
      </section>

      <main
        className="bg-gradient-to-b from-[#0095ff32] to-white min-h-[70vh] relative
        before:content-['ENSET'] before:text-[400px] before:text-white before:z-20 before:absolute
        before:flex before:justify-center before:tracking-widest before:-translate-y-10
        before:text-center before:left-0 before:border-l-8"
      >
        {/* Search Input */}
        <div className="flex justify-center z-[10000] h-20 w-fit right-0 absolute top-0 mb-20">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search Announcement By Name"
            className="h-10 w-80 my-10 mr-6 rounded-2xl text-sm text-gray-400 bg-white border border-gray-300 placeholder:text-[.7rem] placeholder:text-gray-300 pl-5 focus:outline-1"
          />
        </div>

        <div className="w-full h-fit pt-30 px-6 justify-center z-50 relative mb-10">
          {isLoading ? (
            <p className="text-center text-gray-500 py-10">Loading...</p>
          ) : isError ? (
            <p className="text-center text-red-500 py-10">Error: {error.message}</p>
          ) : data.length !== 0 ? (
            data.map((ele, index) => (
              <DisplayEventAnnounce
                key={index}
                event={ele}
                clicked={() => handleEventClick(ele.id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">Nothing found.</p>
          )}
        </div>

        <BigFooter />
      </main>
    </>
  );
}
