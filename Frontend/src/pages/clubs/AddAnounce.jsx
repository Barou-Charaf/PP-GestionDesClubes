import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const imageSchema = yup
  .mixed()
  .test('fileSize', 'File size is too large', (value) => {
    return value === null || (value instanceof File && value.size <= 1024 * 1024);
  });

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  image: imageSchema.nullable().required('An image is required'),
});

const AddAnouce = ({ anouce, setAnouce,onSuccess }) => {
  const { id: clubId } = useParams();
  const token = Cookies.get('auth_token');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    setValue('image', file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue('image', null);
  };

 const onSubmit = async (data) => {
  try {
    setUploading(true);

    const formData = new FormData();
    formData.append('club_id', clubId);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', data.image);

    const res = await axios.post('http://localhost:8000/api/announcements', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    console.log('Created:', res.data);
    if (onSuccess) onSuccess(); // ✅ this triggers useQuery's refetch
    setAnouce(false);
  } catch (error) {
    console.error('Upload failed:', error.response?.data || error.message);
    alert('Failed to create announcement.');
  } finally {
    setUploading(false);
  }
};


  return (
    <div className="w-full h-[450%] bg-[#0000008a] absolute z-[1000000] top-0 left-0 right-0 pt-40">
      <div className="w-[80%] m-auto p-15 bg-gradient-to-b from-[#e6f0ff] to-white rounded shadow">
        <h2 className="text-2xl font-extrabold text-gray-800">Add Announcement</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block mt-6 pl-1 text-[#495057]">Title</label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className="w-full p-2 border border-gray-300 rounded bg-white"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mt-6 pl-1 text-[#495057]">Description</label>
            <textarea
              id="description"
              {...register('description')}
              className="w-full p-2 border border-gray-300 rounded bg-white min-h-[80px]"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-[0.7rem] text-gray-500 text-center mb-2">Add One Image (Max 1MB)</label>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="image-upload" className="btn bg-white text-gray-700 rounded-full cursor-pointer mt-2">
                  Add Image
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}

              {previewImage ? (
                <div className="relative w-[50%] h-[200px] border border-gray-300 rounded overflow-hidden flex items-center justify-center">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <div className="w-[50%] h-[200px] bg-gray-200 rounded flex items-center justify-center text-gray-500">
                  +
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setAnouce(false)}
              className="btn rounded-full bg-white text-gray-800 cursor-pointer border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="btn rounded-full bg-gray-600 text-white cursor-pointer border"
            >
              {uploading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnouce;
