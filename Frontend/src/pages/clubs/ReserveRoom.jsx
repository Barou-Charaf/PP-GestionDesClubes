import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Yup schema for validation
const reservationSchema = yup.object().shape({
  room: yup.string().required('Room selection is required'),
  date: yup.date().required('Date is required'),
  startTime: yup.string().required('Start time is required'),
  endTime: yup.string().required('End time is required'),
  reason: yup.string().required('Reason is required'),
});

const ReserveRoom = ({setReserve}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reservationSchema),
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    setReserve(false);
  };

  return (
    <div className="fixed inset-0  flex  ml-30 p-4">
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <h2 className="text-lg font-semibold mb-4 text-gray-800">Reservation</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">Choose Salle:</label>
            <select
              {...register('room')}
              id="room"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.room ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              defaultValue="Salle 1"
            >
              <option value="Salle 1">Salle 1</option>
              <option value="Salle 2">Salle 2</option>
              <option value="Salle 3">Salle 3</option>
            </select>
            {errors.room && <p className="text-red-500 text-xs mt-1">{errors.room.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
            <input
              {...register('date')}
              id="date"
              type="date"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.date ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time:</label>
            <input
              {...register('startTime')}
              id="startTime"
              type="time"
              placeholder="HH:MM"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.startTime ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
            />
            {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End Time:</label>
            <input
              {...register('endTime')}
              id="endTime"
              type="time"
              placeholder="HH:MM"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.endTime ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
            />
            {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason:</label>
            <textarea
              {...register('reason')}
              id="reason"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.reason ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              rows={3}
            />
            {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
            onClick={()=>{
                setReserve(false)
            }}
              type="button"
              className='btn rounded-full bg-white text-black border border-gray-300'
             >
              Cancel
            </button>
            <button
              type="submit"
              className='btn rounded-full bg-black text-white border border-gray-300'
              
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReserveRoom;
