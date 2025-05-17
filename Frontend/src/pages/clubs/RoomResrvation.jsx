import React, { use, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ReserveRoom from './ReserveRoom';
import Myreservations from './Myreservations';




const RoomResrvation = ({ reservations, setRoom }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reserve,setReserve]=useState(false);
  const [seeReservations,setSeeReservations]=useState(false);

  const reservationsPerPage = 5;
  const totalPages = Math.ceil(reservations.length / reservationsPerPage);

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <section className='absolute top-30 left-0 right-0 z-100 h-150 bg-gradient-to-b from-[#e6f0ff] to-white flex flex-col justify-content-center items-center'>
      <div className='w-[90%] flex gap-5 h-30 flex-row-reverse items-end'>
        <button 
        onClick={()=>{
            setSeeReservations(true)
        }}
        className='btn bg-white text-gray-900 rounded-full border h-fit border-gray-300 hover:bg-black hover:text-white'>
          My Reservations
        </button>
        <button
         onClick={()=>{
            setReserve(true);
        }}
        className='btn bg-white text-gray-900 rounded-full border h-fit border-gray-300 hover:bg-black hover:text-white'>
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
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Room's</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Club</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">End Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.club}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.startTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-4">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
            </button>

            <p className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              {currentPage} of {totalPages} pages
            </p>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
            >
              <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>

      {
        reserve && <ReserveRoom  setReserve={setReserve}/>
      }
      {
        seeReservations && <Myreservations setSeeReservations={setSeeReservations} />
      }
    </section>
    
  );
};

export default RoomResrvation;
