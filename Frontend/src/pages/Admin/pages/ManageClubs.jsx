// src/pages/Admin/pages/ManageClubs.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Search, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddClub from '../components/AddClub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

export default function ManageClubs({ token }) {
  /* ────────── local state ────────── */
  const [search,  setSearch]  = useState('');
  const [showAdd, setShowAdd] = useState(false);
  /* -------------------------------- */

  const navigate     = useNavigate();
  const queryClient  = useQueryClient();

  /* ────────── FETCH clubs ────────── */
  const { data: allClubs = [], isLoading, isError, error } = useQuery({
    queryKey: ['clubsInAdmin'],
    enabled:  !!token,
    queryFn: async () => {
      const res = await axios.get('http://localhost:8000/api/clubs', {
        headers: {
          'Content-Type':  'application/json',
          Accept:          'application/json',
          Authorization:   `Bearer ${token}`,
        },
      });
      return res.data.data;      // API shape: { current_page, data: [...] }
    },
  });
  /* -------------------------------- */

  /* ────────── DELETE mutation ────────── */
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`http://localhost:8000/api/clubs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: (_, id) => {
      toast.success('Club deleted');
      queryClient.setQueryData(['clubsInAdmin'], old =>
        old ? old.filter(c => c.id !== id) : []);
    },
    onError: (err) => {
      toast.error('Delete failed: ' + (err.response?.data?.message || err.message));
    },
  });
  /* ------------------------------------ */

  /* ────────── ACTIVATE / DEACTIVATE ────────── */
  const toggleActive = useMutation({
    mutationFn: ({ clubId, active }) => {
      const fd = new FormData();
      fd.append('active', active ? 'true' : 'false');
      return axios.post(
        `http://localhost:8000/api/clubs/${clubId}/active`,
        fd,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: (resp, { clubId }) => {
      toast.success('Status updated');
      const updated = resp.data.club;          // API returns updated row
      queryClient.setQueryData(['clubsInAdmin'], old =>
        old ? old.map(c => (c.id === clubId ? { ...c, active: updated.active } : c)) : []);
    },
    onError: (err) => {
      toast.error('Update failed: ' + (err.response?.data?.message || err.message));
    },
  });
  /* ------------------------------------------- */

  
  if (isLoading) {
      return (
        <div className="flex justify-center text-green-400 items-center py-10 mt-50">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      );
    }
  if (isError)   return <div className="p-4 text-red-500">Error: {error.message}</div>;

  /* ────────── search filter ────────── */
  const filteredClubs = search
    ? allClubs.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : allClubs;
  /* ----------------------------------- */

  return (
    <section>
      {/* ────────── header ────────── */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Clubs</h1>

        <div className="flex gap-2">
          {/* search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-10 w-64 rounded-lg border border-gray-200 px-4 pr-10 focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          {/* add club */}
          <button onClick={() => setShowAdd(true)} className="btn">
            + Add Club
          </button>
        </div>
      </header>

      {/* ────────── table ────────── */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-[.7rem] text-gray-500">
            {filteredClubs.map((club, idx) => (
              <tr key={club.id} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="px-4 py-3">{club.name}</td>
                <td className="px-4 py-3">{club.email}</td>
                <td className="px-4 py-3">{club.phone}</td>
                <td className="px-4 py-3">{club.description}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      club.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {club.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="space-x-2 px-4 py-3">
                  {/* activate / deactivate */}
                  <button
                    onClick={() =>
                      toggleActive.mutate({ clubId: club.id, active: !club.active })
                    }
                    className={`btn rounded-full px-3 py-1 text-xs font-medium ${
                      club.active
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {club.active ? 'Deactivate' : 'Activate'}
                  </button>

                  {/* delete */}
                  <button
                    onClick={() => deleteMutation.mutate(club.id)}
                    className="rounded p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* view */}
                  <button
                    onClick={() => navigate(`/clubs/${club.id}`)}
                    className="rounded p-0 bg-transparent text-gray-500 hover:text-gray-700"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add-club modal */}
        {showAdd && <AddClub setClub={setShowAdd} token={token} />}
      </div>
    </section>
  );
}
