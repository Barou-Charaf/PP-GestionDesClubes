// src/pages/Admin/pages/Users.jsx
import React, { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddUser from '../components/AddUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Users({ token }) {
  const [showAdd, setShowAdd] = useState(false);
  const [emailQuery, setEmailQuery] = useState('');        // ← search text
  const queryClient = useQueryClient();

  /* ────────── fetch users ────────── */
  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    enabled:  !!token,
    queryFn: async () => {
      const res = await axios.get('http://localhost:8000/api/users', {
        headers: {
          Accept:        'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
  });
  /* -------------------------------- */

  /* ────────── delete user ────────── */
  const deleteMutation = useMutation({
    mutationFn: id =>
      axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success('User deleted');
      queryClient.invalidateQueries(['users']);
    },
    onError: err =>
      toast.error('Delete failed: ' + (err.response?.data?.message || err.message)),
  });
  /* --------------------------------- */

 if (isLoading) {
    return (
      <div className="flex justify-center text-green-400 items-center py-10 mt-50">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }
  if (isError)   return <p className="p-4 text-red-500">Error loading users: {error.message}</p>;

  /* ────────── hide super-admins + filter by email ────────── */
  const visibleUsers = users
    .filter(u => u.role !== 'super_admin')
    .filter(u =>
      u.email.toLowerCase().includes(emailQuery.trim().toLowerCase())
    );
  /* --------------------------------------------------------- */

  return (
    <section>
      {/* ────────── header ────────── */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>

        <div className="flex gap-2">
          {/* search-by-email box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by email"
              value={emailQuery}
              onChange={e => setEmailQuery(e.target.value)}
              className="h-10 w-64 rounded-lg border border-gray-200 px-4 pr-10 focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          {/* add user */}
          <button onClick={() => setShowAdd(true)} className="btn">
            + Add User
          </button>
        </div>
      </header>

      {/* ────────── table ────────── */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Club&nbsp;ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {visibleUsers.map((row, idx) => (
              <tr key={row.id} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="px-4 py-3 text-center">{row.id}</td>
                <td className="px-4 py-3 text-center">{row.club_id}</td>
                <td className="px-4 py-3 text-center">{row.email}</td>
                <td className="flex justify-center gap-2 px-4 py-3">
                  <button
                    onClick={() => deleteMutation.mutate(row.id)}
                    className="rounded p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* add-user modal */}
        {showAdd && <AddUser token={token} setUser={setShowAdd} />}
      </div>
    </section>
  );
}
