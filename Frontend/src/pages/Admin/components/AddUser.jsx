import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

const schema = yup.object().shape({
  email:   yup.string().email('Should be an Email').required('Email is required'),
  club_id: yup.string().required('Please select a club'),
});

export default function AddUser({ setUser, token }) {
  const queryClient = useQueryClient();

  // Fetch clubs for select
  const { data: clubs = [] } = useQuery({
    queryKey: ['clubsForUser'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:8000/api/clubs', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      return res.data.data;
    },
    enabled: !!token,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Create user mutation
  const createUser = useMutation({
    mutationFn: newUser =>
      axios.post('http://localhost:8000/api/admins', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      toast.success('User created');
      queryClient.invalidateQueries(['users']);
      setUser(false);
      reset();
    },
    onError: err => {
      toast.error('Create failed: ' + (err.response?.data?.message || err.message));
    },
  });

  const onSubmit = data => {
    createUser.mutate(data);
  };

  return (
    <div className="absolute top-10 right-30 w-100 m-auto bg-[#f7f6fe] p-6 rounded-xl shadow-lg">
      <button
        onClick={() => setUser(false)}
        className="btn p-0 size-10 rounded-full absolute top-5 left-5"
      >
        <X className="h-4 w-4" />
      </button>
      <h2 className="text-2xl font-bold mb-2 text-center">Add User</h2>
      <p className="text-sm text-gray-500 mb-4 text-center">Create a user to manage a club</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Club select */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Select Club</label>
          <select
            {...register('club_id')}
            className="w-full p-2 border border-gray-300 rounded"
            defaultValue=""
          >
            <option value="" disabled>
              Select a club
            </option>
            {clubs.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.club_id && <p className="text-red-500 text-xs mt-1">{errors.club_id.message}</p>}
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => { reset(); setUser(false); }}
            className="btn bg-white border text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="btn bg-gray-500 text-white px-6 py-2 rounded">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}
