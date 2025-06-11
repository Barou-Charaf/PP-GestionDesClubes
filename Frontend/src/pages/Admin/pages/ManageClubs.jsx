import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Search, Eye, Trash2 } from 'lucide-react';
import AddClub from '../components/AddClub';
import { useNavigate } from 'react-router-dom';

export default function ManageClubs({ token }) {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch clubs with auth header
  const { data: allClubs = [], isLoading, isError, error } = useQuery({
    queryKey: ['clubsInAdmin'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:8000/api/clubs', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
    enabled: !!token,
  });

  // Delete club
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`http://localhost:8000/api/clubs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success('Club deleted');
      queryClient.invalidateQueries(['clubsInAdmin']);
    },
    onError: (err) => {
      toast.error('Delete failed: ' + (err.response?.data?.message || err.message));
    },
  });

  // Activate/Deactivate
  const toggleActive = useMutation({
    mutationFn: ({ clubId, active }) => {
      const formData = new FormData();
      formData.append('active', active ? 'true' : 'false');
      return axios.post(
        `http://localhost:8000/api/clubs/${clubId}/active`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success('Status updated');
      queryClient.invalidateQueries(['clubsInAdmin']);
    },
    onError: (err) => {
      toast.error('Update failed: ' + (err.response?.data?.message || err.message));
    },
  });

  if (isLoading) return <div className="p-4">Loading clubs…</div>;
  if (isError)   return <div className="p-4 text-red-500">Error: {error.message}</div>;

  // Filter by search
  const filteredClubs = search
    ? allClubs.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : allClubs;

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Clubs</h1>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-10 w-64 rounded-lg border border-gray-200 px-4 pr-10 focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute right-3 top-1/2 w-4 h-4 -translate-y-1/2 text-gray-400" />
          </div>
          <button onClick={() => setShowAdd(true)} className="btn">
            + Add Club
          </button>
        </div>
      </header>

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
                      club.active === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {club.active === 1 ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() =>
                      toggleActive.mutate({ clubId: club.id, active: club.active !== 1 })
                    }
                    className={`btn rounded-full px-3 py-1 text-xs font-medium ${
                      club.active === 1
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {club.active === 1 ? 'Deactivate' : 'Activate'}
                  </button>

                  <button
                    onClick={() => deleteMutation.mutate(club.id)}
                    className="rounded p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Trash2 size={16} />
                  </button>

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
         {showAdd && <AddClub setClub={setShowAdd} token={token} />}

        <div className="flex items-center justify-end border-t border-gray-200 px-4 py-3">
          <span className="text-sm text-gray-700">Previous</span>
          <div className="inline-flex gap-1 text-sm">
            <button className="px-2 py-1 rounded bg-indigo-600 text-white">1</button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">2</button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">3</button>
          </div>
          <span className="ml-5 text-sm text-gray-700">Next</span>
        </div>
      </div>
    </section>
  );
}
