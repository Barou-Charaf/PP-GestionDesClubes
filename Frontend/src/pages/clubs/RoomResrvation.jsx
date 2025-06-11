import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ReserveRoom from './ReserveRoom';
import Myreservations from './Myreservations';

const RoomResrvation = ({ setRoom, token, clubId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reserve, setReserve] = useState(false);
  const [seeReservations, setSeeReservations] = useState(false);

  // Fetch reservations array from the `data` field
  const { data: reservations = [], isLoading, isError } = useQuery({
    queryKey: ['all-reservations'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:8000/api/salle_reservation', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data || [];
    },
    enabled: !!token,
  });

  const reservationsPerPage = 5;
  const totalPages = Math.ceil(reservations.length / reservationsPerPage);
  const currentReservations = reservations.slice(
    (currentPage - 1) * reservationsPerPage,
    currentPage * reservationsPerPage
  );

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Only this club's reservations for the "My Reservations" modal
  const myReservations = reservations.filter(
    (r) => r.club_id === Number(clubId)
  );

  return (
    <section className='absolute top-30 left-0 right-0 z-100 h-150 bg-gradient-to-b from-[#e6f0ff] to-white flex flex-col justify-center items-center'>
      <div className='w-[90%] flex gap-5 h-30 flex-row-reverse items-end'>
        <button
          onClick={() => setSeeReservations(true)}
          className='btn bg-white text-gray-900 rounded-full border h-fit border-gray-300 hover:bg-black hover:text-white'
        >
          My Reservations
        </button>
        <button
          onClick={() => setReserve(true)}
          className='btn bg-white text-gray-900 rounded-full border h-fit border-gray-300 hover:bg-black hover:text-white'
        >
          Reserve
        </button>
      </div>

      <div className="bg-white relative p-4 rounded-lg shadow-md w-[90%] m-auto">
        <button
          onClick={() => setRoom(false)}
          className="btn absolute -left-4 -top-5 bg-white border border-gray-300 size-11 p-0 rounded-full flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-700" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">TABLE RESERVATION</h2>

        {isLoading ? (
          <p className="text-center py-6 text-gray-500">Loading reservations...</p>
        ) : isError ? (
          <p className="text-center py-6 text-red-500">Failed to load reservations</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Room's</th>
                    <th className="px-6 py-3">Club</th>
                    <th className="px-6 py-3">Reason</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Start</th>
                    <th className="px-6 py-3">End</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentReservations.map((res) => (
                    <tr key={res.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">{res.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{res.salle_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{res.club_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{res.reason}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{res.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{res.start_time}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{res.end_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <p className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
                {currentPage} of {totalPages}
              </p>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </>
        )}
      </div>

      {reserve && (
        <ReserveRoom
          setReserve={setReserve}
          token={token}
          clubId={clubId}
        />
      )}
      {seeReservations && (
        <Myreservations
          setSeeReservations={setSeeReservations}
          reservations={myReservations}
          token={token}
          clubId={clubId}
        />
      )}
    </section>
  );
};

export default RoomResrvation;
