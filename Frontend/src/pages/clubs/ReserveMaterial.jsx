import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { XCircle } from 'lucide-react';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const schema = yup.object().shape({
  file: yup
    .mixed()
    .required('A file is required')
    .test('fileFormat', 'Only PDF files are allowed', (value) => {
      return value && value.type === 'application/pdf';
    }),
});

const ReserveMaterial = ({setReserve}) => {
  const [isDragging, setIsDragging] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const file = watch('file');

  const handleFileChange = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles?.[0];
    if (newFile) {
      newFile.preview = URL.createObjectURL(newFile);
      setValue('file', newFile, { shouldValidate: true });
    }
  }, [setValue]);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileChange(e.dataTransfer.files);
    },
    [handleFileChange]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e) => {
    handleFileChange(e.target.files);
  };

  const handleCancel = () => {
    reset();
  };

  const onSubmit = (data) => {
    console.log('File to save:', data.file);
    reset();
  };

  return (
    <>
      <div className="bg-gradient-to-b from-[#e6f0ff]  to-white h-100 absolute top-0 left-50 border border-gray-300 z-50 rounded-xl shadow-xl p-6 w-full max-w-sm overflow-hidden">
            <button 
                
                onClick={()=>{
            
                    setReserve(false);        
                }
            }
                 className="btn absolute right-1 top-1 bg-white border border-gray-300 size-11 p-0 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-700" />
                </button>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Upload PDF</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed text-sm border-violet-300 h-50 flex flex-col gap-5 w-[100%] justify-center rounded-md p-6 text-center cursor-pointer transition-colors duration-200 ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            {file ? (
              <div className="flex items-center justify-center gap-4">
                <p className="text-gray-700 truncate">{file.name}</p>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="text-blue-500 hover:text-blue-700 cursor-pointer font-medium"
                >
                  Browse
                </label>
                <p className="text-gray-600">Or drag and drop here</p>
              </>
            )}
          </div>
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
          )}

          <div className="flex justify-end gap-4 mt-6 translate-y-10">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-1 btn bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <XCircle className="h-4 w-4" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={!file}
              className={`px-6 py-2 rounded-md text-white transition ${
                file
                  ? 'btn'
                  : 'btn bg-violet-400 opacity-50 cursor-not-allowed'
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReserveMaterial;
