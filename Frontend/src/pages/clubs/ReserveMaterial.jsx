import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { XCircle } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const schema = yup.object({
  file: yup
    .mixed()
    .required('A file is required')
    .test('fileFormat', 'Only PDF files are allowed', (value) =>
      value?.type === 'application/pdf'
    ),
});

export default function ReserveMaterial({ setReserve, clubId, token }) {
  const queryClient = useQueryClient();
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const file = watch('file');

  const handleFileChange = useCallback(
    (files) => {
      const newFile = files?.[0];
      if (newFile) {
        newFile.preview = URL.createObjectURL(newFile);
        setValue('file', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileChange(e.dataTransfer.files);
    },
    [handleFileChange]
  );
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleSelect = (e) => handleFileChange(e.target.files);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      return axios.post(
        'http://localhost:8000/api/materials',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['materials']);
      setReserve(false);
    },
    onError: (err) => {
      console.error('❌ Material reservation error:', err.response?.data || err);
      const msg =
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        err.message;
      alert('Failed to reserve material: ' + msg);
    },
  });

  const onSubmit = ({ file }) => {
    const formData = new FormData();
    formData.append('club_id', String(clubId));
    formData.append('pdf_demande', file);

    console.log('Posting material reservation:', {
      club_id: clubId,
      pdf_demande: file.name,
    });

    mutation.mutate(formData);
    reset();
  };

  return (
    <div className="bg-gradient-to-b from-[#e6f0ff] to-white h-100 absolute top-0 left-1/3 border border-gray-300 z-50 rounded-xl shadow-xl p-6 w-full max-w-sm overflow-hidden">
      <button
        onClick={() => setReserve(false)}
        className="btn absolute right-1 top-1 bg-white border border-gray-300 size-11 p-0 rounded-full flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-700" />
      </button>

      <h2 className="text-lg font-semibold mb-4 text-gray-800">Upload PDF</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed h-40 flex flex-col items-center justify-center rounded-md p-4 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          {file ? (
            <p className="text-gray-700 truncate">{file.name}</p>
          ) : (
            <>
              <input
                id="file-input"
                type="file"
                accept="application/pdf"
                onChange={handleSelect}
                className="hidden"
              />
              <label htmlFor="file-input" className="text-blue-500 hover:text-blue-700 cursor-pointer">
                Browse PDF
              </label>
              <p className="text-gray-600 mt-2">or drag and drop here</p>
            </>
          )}
        </div>
        {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>}

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => { reset(); setReserve(false); }}
            className="btn bg-white text-gray-700 border rounded px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!file}
            className={`btn px-4 py-2 rounded text-white ${
              file ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
