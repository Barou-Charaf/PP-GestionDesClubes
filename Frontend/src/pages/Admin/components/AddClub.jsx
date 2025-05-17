import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X } from "lucide-react"; // Optional for cancel icon

// Yup schema for validation
const schema = yup.object().shape({
  clubName: yup.string().required("Club name is required"),
  description: yup.string().required("Description is required"),
  phone: yup.string(),
  facebook: yup.string().url("Must be a valid URL"),
  instagram: yup.string().url("Must be a valid URL"),
  linkedin: yup.string().url("Must be a valid URL"),
  email: yup.string().email("Invalid email"),
});



const AddClub = ({club,setClub}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset(); // Clear form after submit
    setClub(false)
  };

  return (
    <div className="p-6 max-w-3xl mx-auto rounded-xl shadow-md bg-gradient-to-b from-blue-100 to-white absolute top-10 ">
        <span 
        className="absolute top-5 left-5 size-10 btn p-0 rounded-full  "
        onClick={()=>{
            setClub(false);
        }}
        >
        <X className="h-4 w-4" />
        </span>
        <h2
        className="text-2xl m-auto w-fit my-5 font-semibold text-gray-600"
        >
            Add Club
        </h2>
    
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Club name</label>
          <input
            type="text"
            {...register("clubName")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.clubName && <p className="text-red-500 text-sm">{errors.clubName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows="4"
            {...register("description")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm text-gray-700">Phone</label>
            <input {...register("phone")} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Facebook</label>
            <input {...register("facebook")} className="w-full p-2 border border-gray-300 rounded" />
            {errors.facebook && <p className="text-red-500 text-sm">{errors.facebook.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700">Instagram</label>
            <input {...register("instagram")} className="w-full p-2 border border-gray-300 rounded" />
            {errors.instagram && <p className="text-red-500 text-sm">{errors.instagram.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700">LinkedIn</label>
            <input {...register("linkedin")} className="w-full p-2 border border-gray-300 rounded" />
            {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin.message}</p>}
          </div>
          <div className="col-span-full">
            <label className="block text-sm text-gray-700">Email</label>
            <input {...register("email")} className="w-full p-2 border border-gray-300 rounded" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="flex items-center text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-full text-white bg-gray-500 hover:bg-gray-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClub;