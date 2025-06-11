import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// For subtle pop-out notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Validation schema
const schema = yup.object().shape({
  clubName: yup.string().required('Club name is required'),
  description: yup.string().required('Description is required'),
  phone: yup.string().matches(/^\+?[0-9\- ]+$/, 'Invalid phone number').required('Phone is required'),
  facebook: yup.string().url('Must be a valid URL').nullable().transform(value => value === '' ? null : value), // Transform empty string to null
  instagram: yup.string().url('Must be a valid URL').nullable().transform(value => value === '' ? null : value), // Transform empty string to null
  linkedin: yup.string().url('Must be a valid URL').nullable().transform(value => value === '' ? null : value), // Use 'linkedin' to match your API screenshot
  email: yup.string().email('Invalid email').required('Email is required'),
  photo: yup.mixed().nullable().test(
    "fileSize",
    "File too large (max 5MB)",
    (value) => !value || (value instanceof File && value.size <= 5 * 1024 * 1024) // 5MB limit
  ).test(
    "fileType",
    "Unsupported file format (only JPEG, PNG, GIF)",
    (value) => !value || (value instanceof File && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
  ),
  verified: yup.boolean().required(), // Added validation for verified
});

const ModifieProfile = ({ edit, setEdit, clubId, currentClubData, token }) => {
  // Initialize preview with current club's logo, ensuring it's an absolute URL
  const [preview, setPreview] = useState(
    currentClubData?.logo && !currentClubData.logo.startsWith('http')
      ? `http://localhost:8000${currentClubData.logo.startsWith('/') ? '' : '/'}${currentClubData.logo}`
      : currentClubData?.logo || null
  );

  const queryClient = useQueryClient();

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clubName: '', // These will be populated by useEffect
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
      // Ensure clubId and token are provided
      if (!clubId || !token) {
        throw new Error("Club ID or Authorization token is missing. Please ensure you are logged in and selecting a club.");
      }

      // Create FormData object
      const data = new FormData();
      // Append form fields to FormData, mapping 'clubName' to 'name' and 'verified' to 'active'
      // And using 'linkedin' as is
      data.append('name', formData.clubName);
      data.append('description', formData.description);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('active', formData.verified ? 'true' : 'false'); // API expects 'true'/'false' strings

      // Conditionally append social media links if they exist and are not null
      if (formData.facebook) {
        data.append('facebook', formData.facebook);
      }
      if (formData.instagram) {
        data.append('instagram', formData.instagram);
      }
      if (formData.linkedin) {
        data.append('linkedin', formData.linkedin); // Use 'linkedin'
      }

      // Append photo if a new one is selected
      if (formData.photo) {
        data.append('logo', formData.photo); // Append the actual File object for 'logo'
      }

      const res = await axios.post(
        `http://localhost:8000/api/clubs/update/${clubId}`,
        data,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the Bearer token
            // 'Content-Type': 'multipart/form-data' is automatically set by axios for FormData
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      // Invalidate queries related to clubs to refetch fresh data
      queryClient.invalidateQueries(['club-profile', clubId]); // Invalidate specific club data
      queryClient.invalidateQueries(['clubs']); // Invalidate all clubs list if you have one (if used elsewhere)

      // Show a subtle success pop-out
      toast.success('Club profile updated successfully!', {
        position: "top-right",
        autoClose: 2000, // Close after 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Close the modal/form after a short delay to allow toast to be seen
      setTimeout(() => {
        setEdit(false);
        window.location.reload(); // Reload the entire page automatically
      }, 2500); // Wait a bit longer than toast.autoClose
    },
    onError: (error) => {
      console.error('Error updating club profile:', error.response?.data || error.message);
      // Show an error pop-out
      toast.error(`Failed to update club profile: ${error.response?.data?.message || error.message || 'Unknown error'}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const onSubmit = (data) => {
    // Call the mutation function with form data
    updateClubMutation.mutate(data);
  };

  const handlePhotoChange = (file, onChange) => {
    onChange(file); // Update react-hook-form field
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file); // Read the file as a data URL for preview
    } else {
      setPreview(
        currentClubData?.logo && !currentClubData.logo.startsWith('http')
          ? `http://localhost:8000${currentClubData.logo.startsWith('/') ? '' : '/'}${currentClubData.logo}`
          : currentClubData?.logo || null
      ); // Revert to original logo if file is cleared
    }
  };

  // Effect to reset form with currentClubData when it changes or when modal is opened
  useEffect(() => {
    if (edit && currentClubData) {
      reset({
        clubName: currentClubData?.name || '',
        description: currentClubData?.description || '',
        phone: currentClubData?.phone || '',
        facebook: currentClubData?.facebook || '',
        instagram: currentClubData?.instagram || '',
        linkedin: currentClubData?.linkedin || '', // Ensure 'linkedin' is used here
        email: currentClubData?.email || '',
        photo: null, // Always keep photo null for initial form state; it's a file input
        verified: currentClubData?.active || false,
      });
      // Set preview based on currentClubData logo, if available and not a local file
      setPreview(
        currentClubData?.logo && !currentClubData.logo.startsWith('http')
          ? `http://localhost:8000${currentClubData.logo.startsWith('/') ? '' : '/'}${currentClubData.logo}`
          : currentClubData?.logo || null
      );
    }
  }, [edit, currentClubData, reset]);


  return (
    <div className="bg-[#000000aa] h-[450%] p-6 pt-20 absolute z-[1000000] top-0 right-0 left-0 bottom-0 ">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left panel */}
        <div className="col-span-1 relative flex flex-col items-center bg-gray-100 p-6 rounded-lg">
          {/* Toggle */}
          <Controller
            control={control}
            name="verified"
            render={({ field }) => (
              <input
                type="checkbox"
                className="absolute top-4 right-4 toggle toggle-primary"
                checked={field.value}
                onChange={e => field.onChange(e.target.checked)}
              />
            )}
          />
          {/* Photo placeholder/upload */}
          <div className="size-45 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
            {preview
              ? <img src={preview} alt="Preview" className="size-45 object-cover" />
              : <div className="text-white text-2xl">👤</div>
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
                className="mt-3 hidden"
              />
            )}
          />
          <label htmlFor='uploadImage' className="mt-2 text-xl active:scale-[.98] text-gray-700 cursor-pointer "><u>Upload a Photo</u></label>
          {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}


          <h3 className="font-semibold text-xl mt-6">Identity Verification</h3>
          <p className="text-xs text-center text-gray-500 leading-7 mt-1">Officially recognized by ENSET<br/>Registered under Student Affairs Department.</p>
        </div>

        {/* Right panel */}
        <div className="col-span-2 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Club name</label>
            <input
              type="text"
              {...register('clubName')}
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors.clubName && <p className="text-red-500 text-xs mt-1">{errors.clubName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register('description')}
              className="w-full border border-gray-300 rounded p-2 h-32"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['phone', 'facebook', 'instagram', 'linkedin'].map((field, idx) => ( // Changed 'linkedIn' to 'linkedin'
              <div key={idx}>
                <label className="block text-sm font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  {...register(field)}
                  className="w-full border border-gray-300 rounded p-2"
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field].message}</p>}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex justify-end items-center space-x-6 pt-4">
            <button
              onClick={() => {
                setEdit(false);
              }}
              type="button" className="flex items-center text-gray-600 hover:underline">
              <FontAwesomeIcon icon={faTimes} className="mr-1" /> <span className='pl-2 cursor-pointer'>Cancel</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting || updateClubMutation.isPending} // Disable while submitting or mutating
              className="bg-gray-600 text-white px-6 py-2 rounded-full disabled:opacity-50 cursor-pointer "
            >
              {updateClubMutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default ModifieProfile;