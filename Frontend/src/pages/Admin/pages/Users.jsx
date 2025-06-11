import React, { useState } from 'react';
import { Search, Eye, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddUser from '../components/AddUser';

export default function Users({ token }) {
  const [showAdd, setShowAdd] = useState(false);
  const queryClient = useQueryClient();

  // 1) Fetch users
  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:8000/api/users', {
        headers: { 
          Accept: 'application/json',
          Authorization: `Bearer ${token}` 
        },
      });
      return res.data.data;
    },
    enabled: !!token,
  });

  // 2) Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: id =>
      axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success('User deleted');
      queryClient.invalidateQueries(['users']);
    },
    onError: err => {
      toast.error(
        'Delete failed: ' +
          (err.response?.data?.message || err.message)
      );
    },
  });

  if (isLoading) return <p className="p-4">Loading users…</p>;
  if (isError)
    return (
      <p className="p-4 text-red-500">Error loading users: {error.message}</p>
    );

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="h-10 w-64 rounded-lg border border-gray-200 px-4 pr-10 focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute right-3 top-1/2 w-4 h-4 -translate-y-1/2 text-gray-400" />
          </div>
          <button onClick={() => setShowAdd(true)} className="btn">
            + Add User
          </button>
        </div>
      </header>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Club ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((row, idx) => (
              <tr key={row.id} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="px-4 py-3 text-center">{row.id}</td>
                <td className="px-4 py-3 text-center">{row.club_id}</td>
                <td className="px-4 py-3 text-center">{row.email}</td>
                <td className="px-4 py-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => deleteMutation.mutate(row.id)}
                    className="rounded p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => {/* view details */}}
                    className="rounded p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showAdd && (
          <AddUser token={token} setUser={setShowAdd} />
        )}

        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <span className="text-sm text-gray-700">Previous</span>
          <div className="inline-flex gap-1 text-sm">
            <button className="px-2 py-1 rounded bg-indigo-600 text-white">1</button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">2</button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">3</button>
          </div>
          <span className="text-sm text-gray-700">Next</span>
        </div>
      </div>
    </section>
  );
}
