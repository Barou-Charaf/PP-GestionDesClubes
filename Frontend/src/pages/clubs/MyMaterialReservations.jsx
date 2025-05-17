import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const mockReservations = [
  { id: 1, reason: '/downloads/reason1.pdf', date: '01/01/2025', type: 'upcoming' },
  { id: 2, reason: '/downloads/reason2.pdf', date: '02/01/2025', type: 'upcoming' },
  { id: 3, reason: '/downloads/reason3.pdf', date: '03/01/2024', type: 'past', status: 'Rejected' },
  { id: 4, reason: '/downloads/reason4.pdf', date: '04/01/2024', type: 'past', status: 'Confirmed' },
];

const StatusBadge = ({ status }) => {
  const colorMap = {
    Rejected: 'bg-red-500',
    Confirmed: 'bg-green-500',
    Finished: 'bg-gray-500'
  };
  return (
    <span className={`rounded-full text-white text-sm font-semibold py-1 px-4 ${colorMap[status] || 'bg-gray-400'}`}>
      {status || 'Unknown'}
    </span>
  );
};

const TableWrapper = ({ children }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto text-base">
    <h2 className="text-lg font-bold mb-4 text-gray-800">My Reservations</h2>
    {children}
  </div>
);

const ReservationTable = ({ cancelReservation, data, isPast }) => (
  <TableWrapper>
    <table className="w-full border-collapse h-60 text-base ">
      <thead>
        <tr className="bg-black text-white text-sm text-left">
          <th className="p-3">ID</th>
          <th className="p-3">Reason</th>
          <th className="p-3">Reserved At</th>
          <th className="p-3">{isPast ? 'Status' : 'Actions'}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((res) => (
          <tr key={res.id} className="border-t border-gray-300  text-gray-700">
            <td className="p-3 text-sm ">{res.id}</td>
            <td className="p-3 text-sm">
              <a
                href={res.reason}
                download
                className="btn  text-white px-4 w-40  py-2 text-sm"
              >
                Download
              </a>
            </td>
            <td className="p-3 text-sm">{res.date}</td>
            <td className="p-3 text-sm">
              {isPast ? (
                <StatusBadge status={res.status} />
              ) : (
                <button
                  onClick={cancelReservation}
                  className="btn bg-gray-500 text-white px-5 py-2   text-sm"
                >
                  Cancel
                </button>
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
    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} className="p-2 rounded-full btn size-10 bg-black text-white">
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
    <span className="px-4 py-2 border border-gray-300 w-20 text-center rounded-md bg-white font-medium">
      {currentPage}
    </span>
    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} className="p-2 rounded-full btn size-10 bg-black text-white">
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
    <span className="ml-2 text-sm text-gray-600">of {totalPages} pages</span>
  </div>
);

const MyReservations = ({ setSeeReservations }) => {
  const [currentTab, setCurrentTab] = useState('upcoming');
  const [currentPage, setCurrentPage] = useState(1);

  const reservations = mockReservations.filter(r => r.type === currentTab);
  const perPage = 5;
  const totalPages = Math.ceil(reservations.length / perPage);
  const current = reservations.slice((currentPage - 1) * perPage, currentPage * perPage);

  const cancelReservation = () => {
    console.log("canceling...");
  };

  return (
    <div className="p-8 bg-[#eaf2ff] min-h-screen text-lg absolute z-100 top-0 right-0 left-0">
      <div className="mb-6">
        <button onClick={() => setSeeReservations(false)} className="btn p-0 size-8 rounded-full bg-white border border-gray-300">
          <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-700" />
        </button>
        <h1 className="text-3xl font-bold text-gray-700">My Reservations</h1>
        <div className="flex gap-8 mt-4 border-b border-gray-200">
          <button onClick={() => { setCurrentTab('upcoming'); setCurrentPage(1); }}
            className={`pb-3 ${currentTab === 'upcoming' ? 'border-b-2 border-gray-600 font-semibold text-gray-700' : 'text-gray-500'}`}>
            Upcoming
          </button>
          <button onClick={() => { setCurrentTab('past'); setCurrentPage(1); }}
            className={`pb-3 ${currentTab === 'past' ? 'border-b-2 border-gray-600 font-semibold text-gray-700' : 'text-gray-500'}`}>
            Past
          </button>
        </div>
      </div>
      <ReservationTable cancelReservation={cancelReservation} data={current} isPast={currentTab === 'past'} />
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default MyReservations;
