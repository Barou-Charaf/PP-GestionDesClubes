import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

/* -------------------- Validation Schema -------------------- */
const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  // images removed from schema so submit will fire
});

/* ---------------------- Component ---------------------- */
const AddEvent = ({ clubId: propClubId, setEvent }) => {
  const { id: paramId } = useParams();
  const clubId = propClubId || Number(paramId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', description: '' },
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => () => previewImages.forEach(URL.revokeObjectURL), [previewImages]);

  const handleImageChange = e => {
    const files = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > 5) {
      return alert('You can only upload up to 5 images');
    }
    setSelectedFiles(sf => [...sf, ...files]);
    setPreviewImages(pv => [...pv, ...files.map(f => URL.createObjectURL(f))]);
  };

  const handleRemoveImage = idx => {
    setSelectedFiles(sf => sf.filter((_, i) => i !== idx));
    setPreviewImages(pv => pv.filter((_, i) => i !== idx));
  };

  const onSubmit = async ({ title, description }) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('club_id', String(clubId));
    formData.append('title', title);
    formData.append('description', description);
    selectedFiles.forEach(f => formData.append('image[]', f));

    console.log('Submitting payload:');
    for (let [k, v] of formData.entries()) console.log(k, v);

    try {
      const token = Cookies.get('auth_token');
      const { data } = await axios.post(
        'http://localhost:8000/api/activities',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            // no explicit Content-Type
          },
        }
      );
      console.log('Created:', data);
      setEvent(false);
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Failed to create event. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[450%] bg-[#0000008a] absolute inset-0 pt-40 z-[1000000] ">
      <div
        className="w-[80%] m-auto p-15 bg-gradient-to-b from-[#e6f0ff] to-white"
        style={{ borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,.1)' }}
      >
        <h2 className="text-2xl font-extrabold text-gray-800">Add Event</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mt-6">
            <label htmlFor="title" className="block mb-1 pl-1 text-gray-700">
              Title
            </label>
            <input
              id="title"
              {...register('title')}
              className="w-full p-2 border border-gray-300 rounded bg-white"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mt-8">
            <label htmlFor="description" className="block mb-1 pl-1 text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              className="w-full p-2 border border-gray-300 rounded bg-white min-h-[80px]"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mt-8">
            <label className="block mb-1 text-[.7rem] text-center text-gray-600">
              Add Images (max 5)
            </label>
            <div className="flex items-center gap-2">
              <label
                htmlFor="image-upload"
                className="btn bg-white mt-2 text-gray-700 rounded-full cursor-pointer"
              >
                Add Image
              </label>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>

            <div
              className="grid gap-2 mt-4"
              style={{ gridTemplateColumns: 'repeat(3,1fr)' }}
            >
              {previewImages.map((src, i) => (
                <div
                  key={i}
                  className="relative w-full h-[200px] border border-gray-300 rounded overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/50 text-white text-xs rounded-full flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
              {Array.from({ length: 5 - previewImages.length }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-[200px] border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 bg-gray-100"
                >
                  +
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-8">
            <button
              type="button"
              onClick={() => setEvent(false)}
              className="btn rounded-full bg-white text-gray-800 border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn rounded-full bg-gray-600 text-white border disabled:opacity-70"
            >
              {loading ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
