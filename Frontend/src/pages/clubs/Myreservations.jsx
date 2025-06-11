import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ReserveRoom from './ReserveRoom';

const truncate = (text) =>
  text.length > 30 ? text.slice(0, 30) + '...' : text;

const StatusBadge = ({ status }) => {
  const colorMap = {
    Rejected: 'bg-red-500',
    Confirmed: 'bg-green-500',
    Finished: 'bg-gray-500',
    pending: 'bg-yellow-500',
  };
  const key = (status || '').toLowerCase();
  return (
    <span className={`rounded-full text-white text-sm font-semibold py-1 px-4 ${colorMap[key] || 'bg-gray-400'}`}>
      {status}
    </span>
  );
};

const TableWrapper = ({ children }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-6xl mx-auto text-base">
    <h2 className="text-lg font-bold mb-4 text-gray-800">TABLE MY RESERVATION</h2>
    {children}
  </div>
);

const ReservationTable = ({ data, isPast, onCancel, onEdit }) => (
  <TableWrapper>
    <table className="w-full border-collapse text-base">
      <thead>
        <tr className="bg-black text-white text-sm text-left">
          <th className="p-3">#</th>
          <th className="p-3">Room’s</th>
          <th className="p-3">Reason</th>
          <th className="p-3">Date</th>
          <th className="p-3">Start</th>
          <th className="p-3">End</th>
          {isPast ? <th className="p-3">Status</th> : <th className="p-3">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => (
          <tr key={r.id} className="border-t border-gray-300 text-gray-700">
            <td className="p-3 text-sm">{i + 1}</td>
            <td className="p-3 text-sm">{r.salle_name}</td>
            <td className="p-3 text-sm">{truncate(r.reason)}</td>
            <td className="p-3 text-sm">{r.date}</td>
            <td className="p-3 text-sm">{r.start_time}</td>
            <td className="p-3 text-sm">{r.end_time}</td>
            <td className="p-3 text-sm">
              {isPast ? (
                <StatusBadge status={r.status} />
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(r)}
                    className="btn bg-indigo-500 active:bg-indigo-600 rounded text-white px-6 py-2 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onCancel(r.id)}
                    className="btn bg-red-500 avtive:bg-red-400  rounded text-white px-6 py-2 text-sm"
                  >
                    Cancel
                  </button>
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
    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} className="p-2 rounded-full btn bg-black text-white">
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
    <span className="px-4 py-2 border border-gray-300 w-20 text-center rounded-md bg-white font-medium">
      {currentPage}
    </span>
    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} className="p-2 rounded-full btn bg-black text-white">
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
    <span className="ml-2 text-sm text-gray-600">of {totalPages} pages</span>
  </div>
);

export default function Myreservations({ setSeeReservations, reservations = [], token, clubId }) {
  const [currentTab, setCurrentTab] = useState('upcoming');
  const [currentPage, setCurrentPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const qc = useQueryClient();

  // DELETE mutation with Authorization
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`http://localhost:8000/api/salle_reservation/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => qc.invalidateQueries(['all-reservations']),
    onError: (err) => alert('Delete failed: ' + (err.response?.data?.message || err.message)),
  });

  const handleCancel = (id) => {
    if (window.confirm('Cancel this reservation?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (res) => {
    setEditing(res);
  };

  // filter upcoming vs past
  const filtered = reservations.filter(r =>
    currentTab === 'past'
      ? ['Confirmed','Rejected','Finished'].includes(r.status)
      : !['Confirmed','Rejected','Finished'].includes(r.status)
  );

  const perPage = 5;
  const totalPages = Math.ceil(filtered.length / perPage);
  const current = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="p-8 bg-[#eaf2ff] min-h-screen text-lg absolute z-100 top-0 right-0 left-0">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={() => setSeeReservations(false)} className="btn bg-white border rounded-full p-2">
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
        data={current}
        isPast={currentTab === 'past'}
        onCancel={handleCancel}
        onEdit={handleEdit}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {editing && (
        <ReserveRoom
          setReserve={() => setEditing(null)}
          clubId={clubId}
          initialData={editing}  // pre-fill form inputs with existing values
        />
      )}
    </div>
  );
}

