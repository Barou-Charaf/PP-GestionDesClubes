import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X } from "lucide-react";

const schema = yup.object().shape({
  roomName: yup.string().required("Room name is required"),
  availability: yup.boolean(),
});

const AddRoom = ({room,setRoom}) => {
  const [isAvailable, setIsAvailable] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      availability: true,
    },
  });

  const onSubmit = (data) => {
    data.availability = isAvailable;
    console.log("Room Data:", data);
    reset();
    setIsAvailable(true);
    // here pass data to backend and fetchit again you know ._.
    setRoom(false);
  };

  return (
    <div className="p-6 py-10 max-w-md  mx-auto rounded-xl shadow-md bg-gray-100 absolute top-15 left-1/2">
        <span
        onClick={()=>{
            setRoom(false)
        }}
        className="btn p-0 size-10 rounded-full absolute top-5 left-5"
        >
        <X className="h-4 w-4" />
        </span>
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Add Room</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-4">
          <label className="w-28 text-gray-700 font-medium">Room Name :</label>
          <input
            type="text"
            {...register("roomName")}
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {errors.roomName && <p className="text-red-500 text-sm ml-28">{errors.roomName.message}</p>}

        <div className="flex items-center gap-4">
          <label className="w-28 text-gray-700 font-medium">Availability :</label>
          <div
            onClick={() => setIsAvailable(!isAvailable)}
            className={`w-14 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isAvailable ? "bg-green-400" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                isAvailable ? "translate-x-8" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              reset();
              setIsAvailable(true);
            }}
            className="flex items-center text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-200"
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

export default AddRoom;
