import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const mockReservations = [
  { id: 1, room: 'Room 1', reason: 'Short reason', date: '01/01/2025', startTime: '09:00', endTime: '10:00', type: 'upcoming' },
  { id: 2, room: 'Room 2', reason: 'A very long reason that should be trimmed down to maintain design aesthetics.', date: '02/01/2025', startTime: '11:00', endTime: '12:00', type: 'upcoming' },
  { id: 3, room: 'Room 3', reason: 'Another short reason', date: '03/01/2025', startTime: '13:00', endTime: '14:00', type: 'past', status: 'Rejected' },
  { id: 4, room: 'Room 4', reason: 'Meeting with stakeholders and detailed planning discussion', date: '04/01/2025', startTime: '15:00', endTime: '16:00', type: 'past', status: 'Confirmed' },
  { id: 5, room: 'Room 5', reason: 'Workshop', date: '05/01/2025', startTime: '17:00', endTime: '18:00', type: 'upcoming' },
  { id: 6, room: 'Room 6', reason: 'Team review and feedback session', date: '06/01/2025', startTime: '19:00', endTime: '20:00', type: 'upcoming' },
];

const truncate = (text) => text.length > 30 ? text.slice(0, 30) + '...' : text;

const StatusBadge = ({ status }) => {
  const colorMap = {
    Rejected: 'bg-red-500',
    Confirmed: 'bg-green-500',
    Finished: 'bg-gray-500'
  };
  return (
    <span className={`  rounded-full text-white text-[.8rem] font-semibold py-[.6rem]  px-7 ${colorMap[status] || 'bg-gray-400'}`}>
      {status || 'Unknown'}
    </span>
  );
};

const TableWrapper = ({ children }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-6xl mx-auto text-base">
    <h2 className="text-lg font-bold mb-4 text-gray-800">TABLE MY RESERVATION</h2>
    {children}
  </div>
);

const ReservationTable = ({canselReservation, data, isPast }) => (
  <TableWrapper>
    <table className="w-full border-collapse text-base">
      <thead>
        <tr className="bg-black text-white text-sm text-left">
          <th className="p-3">#</th>
          <th className="p-3">Room's</th>
          <th className="p-3">Reason</th>
          <th className="p-3">Date</th>
          <th className="p-3">Start Time</th>
          <th className="p-3">End Time</th>
          {isPast ? <th className="p-3">Status</th> : <th className="p-3">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((res, i) => (
          <tr key={res.id} className="border-t border-gray-300  text-gray-700 pt-[30px]">
            <td className="p-3 text-sm py-5">{i + 1}</td>
            <td className="p-3 text-sm">{res.room}</td>
            <td className="p-3 text-sm">{truncate(res.reason)}</td>
            <td className="p-3 text-sm">{res.date}</td>
            <td className="p-3 text-sm">{res.startTime}</td>
            <td className="p-3 text-sm">{res.endTime}</td>
            <td className="p-3 text-sm">
              {isPast ? (
                <StatusBadge status={res.status} />
              ) : (
                <div className="flex gap-3">
                  <button className="btn bg-[#272d4e] rounded-full text-white px-8 py-2">Edit</button>
                  <button 
                  onClick={canselReservation}
                  className=" btn bg-[#9a9a9a]  rounded-full text-white px-8 py-2">Cancel</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </TableWrapper>
);

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className="flex justify-center items-center mt-6 gap-2 text-lg">
    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} className="p-2 text-sm rounded-full size-10 btn bg-black text-white">
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
    <span className="px-4 py-2 border border-gray-300 w-20 text-center rounded-md bg-white font-medium">{currentPage}</span>
    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} className="p-2 text-sm rounded-full btn size-10 bg-black text-white">
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
    <span className="ml-2 text-sm text-gray-600">of {totalPages} pages</span>
  </div>
);

const Myreservations = ({setSeeReservations}) => {
  const [currentTab, setCurrentTab] = useState('upcoming');
  const [currentPage, setCurrentPage] = useState(1);

  const reservations = mockReservations.filter(r => r.type === currentTab);
  const perPage = 5;
  const totalPages = Math.ceil(reservations.length / perPage);
  const current = reservations.slice((currentPage - 1) * perPage, currentPage * perPage);


  const canselReservation=()=>{
    // do something to cansel resrvation
    console.log("salam")
  }

  return (
    <div className="p-8 bg-[#eaf2ff] min-h-screen text-lg absolute z-100 top-0 right-0 left-0">
      <div className="mb-6">
        <button 
        onClick={()=>{
            setSeeReservations(false)
        }}
        className="btn p-0 size-8 rounded-full  bg-white border border-gray-300 translate-y-3 -translate-x-5">
            <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-700" />
        </button>
        <h1 className="text-3xl font-bold text-gray-700">My Reservations</h1>
        <div className="flex gap-8 mt-4 border-b border-gray-200">
          <button
            onClick={() => {
              setCurrentTab('upcoming');
              setCurrentPage(1);
            }}
            className={`pb-3 ${currentTab === 'upcoming' ? 'border-b-2 translate-y-[1px]  border-gray-600 font-semibold text-gray-700' : 'text-gray-500'}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => {
              setCurrentTab('past');
              setCurrentPage(1);
            }}
            className={`pb-3 ${currentTab === 'past' ? 'border-b-2 border-gray-600 translate-y-[1px] px-6 font-semibold text-gray-700' : 'text-gray-500 px-6'}`}
          >
            Past
          </button>
        </div>
      </div>

      <ReservationTable canselReservation={canselReservation} data={current} isPast={currentTab === 'past'} />
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Myreservations;
