import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { DownloadCloud } from 'lucide-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

export default function RoomsReservations({ token }) {
  const queryClient = useQueryClient();

  // 1️⃣ Fetch all room reservations
  const { data: items = [], isLoading, isError, error } = useQuery({
    queryKey: ['room-reservations'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:8000/api/salle_reservation', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Assuming API returns an array; adjust if wrapped in data field
      return Array.isArray(res.data) ? res.data : res.data.data;
    },
    enabled: !!token,
  });

  // 2️⃣ Mutation to update reservation status
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axios.post(
        `http://localhost:8000/api/salle_reservation/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
    },
    onSuccess: () => {
      toast.success('Reservation status updated');
      queryClient.invalidateQueries(['room-reservations']);
    },
    onError: (err) => {
      const msg = err.response?.data?.message || err.message;
      toast.error('Update failed: ' + msg);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center text-green-400 items-center py-10 mt-50">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }
  if (isError)   return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold">Manage Rooms Reservations</h1>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full table-auto border-collapse text-sm text-center">
          <thead className="bg-gray-100 font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">Id Reservation</th>
              <th className="px-4 py-3">Salle Name</th>
              <th className="px-4 py-3">Club</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Start Time</th>
              <th className="px-4 py-3">End Time</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((row, idx) => {
              const isEven = idx % 2 === 0;
              const key = row.status.toLowerCase();
              const badgeStyles = {
                pending:  'bg-yellow-100 text-yellow-700',
                accepted: 'bg-green-100 text-green-700',
                rejected: 'bg-red-100 text-red-700',
                finished: 'bg-gray-100 text-gray-700',
              }[key] || 'bg-gray-100 text-gray-700';

              const isPending = key === 'pending';

              return (
                <tr key={row.id} className={isEven ? 'bg-gray-50' : ''}>
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.salle_name}</td>
                  <td className="px-4 py-3">{row.club_name}</td>
                  <td className="px-4 py-3">{row.reason}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.start_time}</td>
                  <td className="px-4 py-3">{row.end_time}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium w-25 justify-center ${badgeStyles}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 flex px-3 items-center gap-2 justify-center">
                    <button
                      onClick={() => updateStatus.mutate({ id: row.id, status: 'accepted' })}
                      disabled={!isPending}
                      className={`rounded px-3 py-1 text-xs font-medium w-20 ${
                        isPending
                          ? 'bg-green-500 text-white hover:bg-green-600 btn'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus.mutate({ id: row.id, status: 'rejected' })}
                      disabled={!isPending}
                      className={`rounded px-3 py-1 text-xs font-medium w-20 ${
                        isPending
                          ? 'bg-red-500 text-white hover:bg-red-600 btn'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <span className="text-sm text-gray-700">Previous</span>
          <div className="inline-flex gap-1 text-sm">
            <button className="px-2 py-1 rounded bg-indigo-600 text-white">1</button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">2</button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">3</button>
          </div>
          <span className="text-sm text-gray-700">Next</span>
        </div> */}
      </div>
    </section>
  );
}
