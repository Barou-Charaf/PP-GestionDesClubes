import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight ,faDownload } from '@fortawesome/free-solid-svg-icons';

const StatusBadge = ({ status }) => {
  const colorMap = {
    rejected: 'bg-red-400',
    approved: 'bg-green-400',
    finished:  'bg-gray-500',
    pending:   'bg-yellow-400',
  };
  const key = (status || '').toLowerCase();
  return (
    <div className={`rounded-full text-white text-sm font-semibold py-[.3rem] w-30 text-center ${colorMap[key] || 'bg-gray-400'}`}>
      {status}
    </div>
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
    <table className="w-full border-collapse  text-base">
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
          <tr key={res.id} className="border-t border-gray-300 text-gray-700">
            <td className="p-3 text-sm">{res.id}</td>
           <td className="px-6 py-4">
               <a
                                 href={res.reason}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="btn size-10 p-0 rounded-full "
                                 title="Open PDF in new tab"
                >
                                 <FontAwesomeIcon icon={faDownload} className="w-5 h-5 text-white" />
                               </a>
                             </td>
            <td className="p-3 text-sm">{res.date}</td>
            <td className="p-2 text-sm">
              {isPast ? (
                <StatusBadge status={res.status} />
              ) : (
                <button
                  onClick={() => cancelReservation(res.id)}
                  className="btn bg-red-500 text-white px-8 py-2 text-sm"
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

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => (
  <div className="flex justify-center items-center mt-6 gap-2 text-lg">
    <button
      onClick={onPrev}
      disabled={currentPage <= 1}
      className="p-2 rounded-full btn bg-black text-white disabled:opacity-50"
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
    <span className="px-4 py-2 border border-gray-300 w-20 text-center rounded-md bg-white font-medium">
      {currentPage}
    </span>
    <button
      onClick={onNext}
      disabled={currentPage >= totalPages}
      className="p-2 rounded-full btn bg-black text-white disabled:opacity-50"
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
    <span className="ml-2 text-sm text-gray-600">of {totalPages} pages</span>
  </div>
);

export default function MyMaterialReservations({
  setSeeReservations,
  reservations = [],
  token
}) {
  const [currentTab, setCurrentTab] = useState('upcoming');
  const [currentPage, setCurrentPage] = useState(1);
  const qc = useQueryClient();

  // DELETE mutation with toast notifications
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`http://localhost:8000/api/materials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success('Material reservation deleted successfully');
      qc.invalidateQueries(['materials']);
    },
    onError: (err) => {
      const msg = err.response?.data?.message || err.message;
      toast.error('Delete failed: ' + msg);
    },
  });

  const cancelReservation = (id) => {
    deleteMutation.mutate(id);
  };

  // Filter upcoming vs past
  const filtered = reservations.filter((r) =>
    currentTab === 'upcoming' ? r.status === 'pending' : r.status !== 'pending'
  );

  // Pagination logic
  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const current = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  // Handlers for Prev/Next
  const goPrev = () => setCurrentPage(p => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));

  return (
    <div className="p-8 bg-[#eaf2ff] min-h-screen text-lg absolute top-0 right-0 left-0">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setSeeReservations(false)}
          className="btn bg-white border rounded-full p-2"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-700" />
        </button>
        <h1 className="text-3xl font-bold text-gray-700">My Reservations</h1>
      </div>

      <div className="flex gap-8 border-b border-gray-200 mb-6">
        <button
          onClick={() => { setCurrentTab('upcoming'); setCurrentPage(1); }}
          className={currentTab==='upcoming' ? 'border-b-2 border-gray-600 pb-2 font-semibold' : 'text-gray-500 pb-2'}
        >
          Upcoming
        </button>
        <button
          onClick={() => { setCurrentTab('past'); setCurrentPage(1); }}
          className={currentTab==='past' ? 'border-b-2 border-gray-600 pb-2 font-semibold' : 'text-gray-500 pb-2'}
        >
          Past
        </button>
      </div>

      <ReservationTable
        cancelReservation={cancelReservation}
        data={current}
        isPast={currentTab === 'past'}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
