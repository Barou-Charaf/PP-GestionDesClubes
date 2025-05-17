import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Validation schema
const schema = yup.object().shape({
  clubName: yup.string().required('Club name is required'),
  description: yup.string().required('Description is required'),
  phone: yup.string().matches(/^\+?[0-9\- ]+$/, 'Invalid phone number').required('Phone is required'),
  facebook: yup.string().url('Must be a valid URL').nullable(),
  instagram: yup.string().url('Must be a valid URL').nullable(),
  linkedIn: yup.string().url('Must be a valid URL').nullable(),
  email: yup.string().email('Invalid email').required('Email is required'),
  photo: yup.mixed().nullable()
});

const ModifieProfile = ({edit,setEdit}) => {
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clubName: '',
      description: '',
      phone: '',
      facebook: '',
      instagram: '',
      linkedIn: '',
      email: '',
      photo: null,
      verified: false
    }
  });

  const onSubmit = data => {
    console.log('Form Data:', data);
    setEdit(false)
    // handle save logic here
  };

  const handlePhotoChange = (file, onChange) => {
    onChange(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className="bg-[#000000aa] h-[450%] p-6 pt-20 absolute z-80 top-0 right-0 left-0 bottom-0 ">
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

          <h3 className="font-semibold text-xl  mt-6">Identity Verification</h3>
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
            {['phone', 'facebook', 'instagram', 'linkedIn'].map((field, idx) => (
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
            onClick={()=>{
                setEdit(false)
            }}
            type="button" className="flex items-center text-gray-600 hover:underline">
              <FontAwesomeIcon icon={faTimes} className="mr-1" /> <span className='pl-2 cursor-pointer'>Cancel</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gray-600 text-white px-6 py-2 rounded-full disabled:opacity-50 cursor-pointer "
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifieProfile;