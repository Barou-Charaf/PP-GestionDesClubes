import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const imageSchema = yup.mixed().test(
  'fileSize',
  'File size is too large',
  (value) => value === null || (value instanceof File && value.size <= 1024 * 1024) // 1MB limit
);

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  images: yup
    .array()
    .max(4, 'Maximum 4 images are allowed')
    .of(imageSchema),
});

const AddEventForm = ({event,setEvent}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 4) {
      // You might want to show a user-friendly error message here
      console.error('Cannot upload more than 4 images.');
      return;
    }

    const newPreviewImages = [];
    const newFiles = [];

    for (let i = 0; i < Math.min(files.length, 4 - previewImages.length); i++) {
      const file = files[i];
      newFiles.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviewImages.push(reader.result);
        if (newPreviewImages.length + previewImages.length === Math.min(files.length + previewImages.length, 4)) {
          setPreviewImages((prev) => [...prev, ...newPreviewImages]);
        }
      };
      reader.readAsDataURL(file);
    }

    setValue('images', [...previewImages.map(p => new File([], '')), ...newFiles]); // Update form state with File objects (empty files for existing previews)
  };

  const handleRemoveImage = (index) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);

    const currentImages = Array.isArray(errors.images?.root) ? [...errors.images.root] : [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setValue('images', updatedImages);
  };

  const onSubmit = (data) => {
    console.log('Form data:', { ...data, images: previewImages });
    setEvent(false)
    // Handle your form submission logic here
  };

  return (
   <div
   className='w-full h-[450%] bg-[#0000008a] absolute z-100 top-0 left-0 right-0 pt-40'
   > 
    <div style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
    className=' w-[80%] m-auto bg-gradient-to-b from-[#e6f0ff] to-white p-15 '
    >
      <h2 className='text-2xl font-extrabold text-gray-800 '>Add Event</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', color: '#495057' }} className='mt-6 pl-1'>Title</label>
          <input
            type="text"
            id="title"
            {...register('title')}
            style={{ width: '100%', padding: '8px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box' }}
            className='bg-white'
          />
          {errors.title && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.title.message}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', color: '#495057' }} className='mt-8 pl-1'>Description</label>
          <textarea
            id="description"
            {...register('description')}
            style={{ width: '100%', padding: '8px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box', minHeight: '80px' }}  className='bg-white'
          />
          {errors.description && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.description.message}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#495057' }} className='text-[.7rem] text-gray-200 w-fit m-auto'>Add Images (Max 4)</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label
              htmlFor="image-upload"
             className='btn bg-white mt-8 text-gray-700 rounded-full'
            >
              Add Image
            </label>
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' ,background:"white"}}
            />
          </div>
          {errors.images && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.images.message}</p>}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '15px' }}>
            {previewImages.map((preview, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={preview}
                  alt={`preview-${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '0.8em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
            {Array(4 - previewImages.length)
              .fill(null)
              .map((_, index) => (
                <div
                  key={`empty-${index}`}
                  style={{
                    width: '100%',
                    height: '200px',
                    border: '1px dashed #ccc',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#777',
                    fontSize:  '0.9em',

                  }}
                  className='bg-gray-300'
                >
                  {previewImages.length + index + 1 > 0 && previewImages.length + index + 1 <= 4 && '+'}
                </div>
              ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            onClick={()=>{setEvent(false)}}
          className='btn rounded-full bg-white text-gray-800 cursor-pointer border'
          >
            Cancel
          </button>
          <button
            type="submit"
            className='btn rounded-full bg-gray-600 cursor-pointer text-white border'
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddEventForm;