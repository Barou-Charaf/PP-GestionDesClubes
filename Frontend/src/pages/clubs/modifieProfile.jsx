import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Validation schema
const schema = yup.object().shape({
  clubName: yup.string().required('Club name is required'),
  description: yup.string().required('Description is required'),
  phone: yup.string().matches(/^\+?[0-9\- ]+$/, 'Invalid phone number').required('Phone is required'),
  facebook: yup.string().url('Must be a valid URL').nullable().transform(value => value === '' ? null : value),
  instagram: yup.string().url('Must be a valid URL').nullable().transform(value => value === '' ? null : value),
  linkedin: yup.string().url('Must be a valid URL').nullable().transform(value => value === '' ? null : value),
  email: yup.string().email('Invalid email').required('Email is required'),
  photo: yup.mixed().nullable().test(
    "fileSize",
    "File too large (max 5MB)",
    (value) => !value || (value instanceof File && value.size <= 5 * 1024 * 1024)
  ).test(
    "fileType",
    "Unsupported file format (only JPEG, PNG, GIF)",
    (value) => !value || (value instanceof File && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
  ),
  verified: yup.boolean().required(),
});

const ModifieProfile = ({ edit, setEdit, clubId, currentClubData, token }) => {
  const [preview, setPreview] = useState(
    currentClubData?.logo && !currentClubData.logo.startsWith('http')
      ? `http://localhost:8000${currentClubData.logo.startsWith('/') ? '' : '/'}${currentClubData.logo}`
      : currentClubData?.logo || null
  );

  const queryClient = useQueryClient();

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clubName: '',
      description: '',
      phone: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      email: '',
      photo: null,
      verified: false
    }
  });

  const updateClubMutation = useMutation({
    mutationFn: async (formData) => {
      if (!clubId || !token) {
        throw new Error("Club ID or Authorization token is missing.");
      }

      const data = new FormData();
      data.append('name', formData.clubName);
      data.append('description', formData.description);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('active', formData.verified ? 'true' : 'false');

      if (formData.facebook) data.append('facebook', formData.facebook);
      if (formData.instagram) data.append('instagram', formData.instagram);
      if (formData.linkedin) data.append('linkedin', formData.linkedin);

      if (formData.photo) data.append('logo', formData.photo);

      const res = await axios.post(
        `http://localhost:8000/api/clubs/update/${clubId}`,
        data,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['club-profile', clubId]);
      queryClient.invalidateQueries(['clubs']);
      toast.success('Club profile updated successfully!', {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        setEdit(false);
        window.location.reload();
      }, 2500);
    },
    onError: (error) => {
      console.error('Error updating club profile:', error.response?.data || error.message);
      toast.error(`Failed to update club profile: ${error.response?.data?.message || error.message || 'Unknown error'}`, {
        position: "top-right",
        autoClose: 5000,
      });
    },
  });

  const onSubmit = (data) => {
    updateClubMutation.mutate(data);
  };

  const handlePhotoChange = (file, onChange) => {
    onChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(
        currentClubData?.logo && !currentClubData.logo.startsWith('http')
          ? `http://localhost:8000${currentClubData.logo.startsWith('/') ? '' : '/'}${currentClubData.logo}`
          : currentClubData?.logo || null
      );
    }
  };

  useEffect(() => {
    if (edit && currentClubData) {
      reset({
        clubName: currentClubData?.name || '',
        description: currentClubData?.description || '',
        phone: currentClubData?.phone || '',
        facebook: currentClubData?.facebook || '',
        instagram: currentClubData?.instagram || '',
        linkedin: currentClubData?.linkedin || '',
        email: currentClubData?.email || '',
        photo: null,
        verified: currentClubData?.active || false,
      });
      setPreview(
        currentClubData?.logo && !currentClubData.logo.startsWith('http')
          ? `http://localhost:8000${currentClubData.logo.startsWith('/') ? '' : '/'}${currentClubData.logo}`
          : currentClubData?.logo || null
      );
    }
  }, [edit, currentClubData, reset]);

  return (
    <div className="bg-[#000000aa] h-[450%] p-8 pt-24 absolute z-[1000000] top-0 right-0 left-0 bottom-0 overflow-auto">
      <form onSubmit={handleSubmit(onSubmit)}  className="bg-white scale-90 rounded-lg shadow-lg p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left panel */}
        <div className="col-span-1  relative flex flex-col items-center bg-gray-100 p-8 rounded-lg">
          {/* Toggle */}
          <Controller
            control={control}
            name="verified"
            render={({ field }) => (
              <label className="absolute top-6 right-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={e => field.onChange(e.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`block w-12 h-6 rounded-full transition-colors duration-300 ${
                    field.value ? 'bg-green-400' : 'bg-gray-400'
                  }`}
                />
                <span
                  className={`block absolute top-0 left-0 w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-300 ${
                    field.value ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </label>
            )}
          />
          {/* Photo placeholder/upload */}
          <div className="w-[180px] h-[180px] rounded-full bg-gray-300 overflow-hidden flex items-center justify-center mt-8">
            {preview
              ? <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              : <div className="text-white text-5xl select-none">👤</div>
            }
          </div>
          <Controller
            control={control}
            name="photo"
            render={({ field }) => (
              <input
                id='uploadImage'
                type="file"
                accept="image/*"
                onChange={e => handlePhotoChange(e.target.files[0], field.onChange)}
                className="mt-6 hidden"
              />
            )}
          />
          <label htmlFor='uploadImage' className="mt-4 text-2xl active:scale-[.98] text-gray-700 cursor-pointer hover:underline font-semibold">
            <u>Upload a Photo</u>
          </label>

          {errors.photo && <p className="text-red-600 text-sm mt-2">{errors.photo.message}</p>}

          <h3 className="font-semibold text-2xl mt-10">Identity Verification</h3>
          <p className="text-base text-center text-gray-600 leading-relaxed mt-3 max-w-xs">
            Officially recognized by ENSET<br />Registered under Student Affairs Department.
          </p>
        </div>

        {/* Right panel */}
        <div className="col-span-2 space-y-8">
          <div>
            <label className="block text-lg font-medium mb-2">Club name</label>
            <input
              type="text"
              {...register('clubName')}
              className="w-full border border-gray-400 rounded-lg p-3 text-lg"
            />
            {errors.clubName && <p className="text-red-600 text-sm mt-1">{errors.clubName.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Description</label>
            <textarea
              {...register('description')}
              className="w-full border border-gray-400 rounded-lg p-3 h-40 text-lg resize-none"
            />
            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['phone', 'facebook', 'instagram', 'linkedin'].map((field, idx) => (
              <div key={idx}>
                <label className="block text-lg font-medium mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  {...register(field)}
                  className="w-full border border-gray-400 rounded-lg p-3 text-lg"
                />
                {errors[field] && <p className="text-red-600 text-sm mt-1">{errors[field].message}</p>}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full border border-gray-400 rounded-lg p-3 text-lg"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex justify-end items-center space-x-8 pt-6">
            <button
              onClick={() => setEdit(false)}
              type="button"
              className="flex items-center text-gray-700 border border-gray-300 btn rounded-full bg-gray-200 hover:bg-gray-300 px-8 py-2 text-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || updateClubMutation.isPending}
              className="bg-black text-white px-10 py-2 rounded-full disabled:opacity-50 cursor-pointer text-lg font-semibold  transition-colors"
            >
              {updateClubMutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ModifieProfile;
