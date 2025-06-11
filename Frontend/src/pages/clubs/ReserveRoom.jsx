import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

/* -------------------- Validation Schema -------------------- */
const reservationSchema = yup.object().shape({
  salle_id: yup.string().required('Room is required'),
  date:      yup.string().required('Date is required'),
  start_time: yup.string().required('Start time is required'),
  end_time:   yup.string().required('End time is required').test(
    'is-after-start',
    'End time must be after start time on the same day',
    function (end_time) {
      const { date, start_time } = this.parent;
      if (!date || !start_time || !end_time) {
        return true; // Let required validation handle empty fields
      }

      // Create Date objects for comparison, combining date and time
      const startDateTime = new Date(`${date}T${start_time}:00`); // Append :00 for seconds
      const endDateTime = new Date(`${date}T${end_time}:00`);     // Append :00 for seconds

      return endDateTime > startDateTime;
    }
  ),
  reason:     yup.string().required('Reason is required'),
});

const ReserveRoom = ({ setReserve, clubId, initialData }) => {
  const token = Cookies.get('auth_token');
  const queryClient = useQueryClient();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  /* Fetch available rooms */
  const { data: salles = [] } = useQuery({
    queryKey: ['available-rooms'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:8000/api/salles-available', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.data || [];
    },
    enabled: !!token
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reservationSchema),
    defaultValues: {
      salle_id:    initialData?.salle_id?.toString() || '',
      date:        initialData?.date || '',
      start_time: initialData?.start_time?.substring(0,5) || '',
      end_time:    initialData?.end_time?.substring(0,5) || '',
      reason:      initialData?.reason || ''
    }
  });

  /* Mutation to create/update reservation */
  const mutation = useMutation({
    mutationFn: async (payload) => {
      if (initialData) {
        // Update existing reservation
        const res = await axios.post(
          `http://localhost:8000/api/salle_reservation/update/${initialData.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } }
        );
        return res.data;
      } else {
        // Create new reservation
        const res = await axios.post(
          'http://localhost:8000/api/salle_reservation',
          payload,
          { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } }
        );
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-reservations']);
      setPopupMessage(initialData ? 'Reservation updated successfully!' : 'Reservation created successfully!');
      setIsSuccess(true);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setReserve(false); // Close the modal
      }, 3000); // Close popup and modal after 3 seconds
    },
    onError: (err) => {
      console.error('Reservation error details:', err.response?.data || err);
      const msg = err.response?.data?.error || err.response?.data?.message || err.message;
      setPopupMessage('Failed to save reservation: ' + msg);
      setIsSuccess(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000); // Close error popup after 5 seconds
    },
  });

  const onSubmit = (data) => {
    const payload = {
      salle_id:   parseInt(data.salle_id, 10),
      club_id:    parseInt(clubId, 10),
      reason:     data.reason,
      date:       data.date,
      start_time: data.start_time,
      end_time:   data.end_time,
    };
    console.log('▶️ Submitting payload:', payload);
    mutation.mutate(payload);
  };

  return (
    <>
      <div className="absolute inset-0 -left-60 flex ml-30 p-4 items-center justify-center  z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {initialData ? 'Edit Reservation' : 'Reserve a Room'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Room Selector */}
            <div className="mb-4">
              <label htmlFor="salle_id" className="block mb-1 text-gray-700">Choose Room:</label>
              <select
                {...register('salle_id')}
                id="salle_id"
                className={`w-full p-2 border rounded ${errors.salle_id ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">-- Select a room --</option>
                {salles.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              {errors.salle_id && <p className="text-red-500 text-xs mt-1">{errors.salle_id.message}</p>}
            </div>

            {/* Date */}
            <div className="mb-4">
              <label htmlFor="date" className="block mb-1 text-gray-700">Date:</label>
              <input
                {...register('date')}
                id="date"
                type="date"
                className={`w-full p-2 border rounded ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
            </div>

            {/* Start Time */}
            <div className="mb-4">
              <label htmlFor="start_time" className="block mb-1 text-gray-700">Start Time:</label>
              <input
                {...register('start_time')}
                id="start_time"
                type="time"
                className={`w-full p-2 border rounded ${errors.start_time ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.start_time && <p className="text-red-500 text-xs mt-1">{errors.start_time.message}</p>}
            </div>

            {/* End Time */}
            <div className="mb-4">
              <label htmlFor="end_time" className="block mb-1 text-gray-700">End Time:</label>
              <input
                {...register('end_time')}
                id="end_time"
                type="time"
                className={`w-full p-2 border rounded ${errors.end_time ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.end_time && <p className="text-red-500 text-xs mt-1">{errors.end_time.message}</p>}
            </div>

            {/* Reason */}
            <div className="mb-4">
              <label htmlFor="reason" className="block mb-1 text-gray-700">Reason:</label>
              <textarea
                {...register('reason')}
                id="reason"
                rows={3}
                className={`w-full p-2 border rounded ${errors.reason ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setReserve(false)}
                className="btn bg-white text-black border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-black text-white border rounded"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Pop-up message */}
      {showPopup && (
        <div className={`absolute top-0 right-4 p-4 rounded-lg shadow-lg text-white ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
          {popupMessage}
        </div>
      )}
    </>
  );
};

export default ReserveRoom;