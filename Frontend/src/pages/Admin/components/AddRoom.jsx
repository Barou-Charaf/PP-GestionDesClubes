import React, { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Room name is required"),
  availability: yup.boolean(),
});

export default function AddRoom({ room, setRoom, token }) {
  const [isAvailable, setIsAvailable] = useState(true);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { availability: true },
  });

  const createReservation = useMutation({
    mutationFn: async ({ name, availability }) => {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("availability", availability.toString());
      return axios.post("http://localhost:8000/api/salles", formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
    },
    onSuccess: () => {
      toast.success("Room created");
      queryClient.invalidateQueries(["rooms"]);
      setRoom(false);
      reset();
      setIsAvailable(true);
    },
    onError: err => {
      toast.error("Failed to create room: " + (err.response?.data?.message || err.message));
    },
  });

  const onSubmit = data => {
    createReservation.mutate({ name: data.name, availability: isAvailable });
  };

  return (
    <div className="p-6 py-10 max-w-md mx-auto rounded-xl shadow-md bg-gray-100 absolute top-15 left-1/2">
      <button
        onClick={() => setRoom(false)}
        className="btn p-0 size-10 rounded-full absolute top-5 left-5"
      >
        <X className="h-4 w-4" />
      </button>
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Add Room</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-4">
          <label className="w-28 text-gray-700 font-medium">Room Name :</label>
          <input
            type="text"
            {...register("name")}
            className="flex-1 p-2 border border-gray-300 rounded focus:ring-blue-300"
          />
        </div>
        {errors.name && <p className="text-red-500 text-sm ml-28">{errors.name.message}</p>}

        <div className="flex items-center gap-4">
          <label className="w-28 text-gray-700 font-medium">Availability :</label>
          <div
            onClick={() => setIsAvailable(!isAvailable)}
            className={`w-14 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              isAvailable ? "bg-green-400" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                isAvailable ? "translate-x-8" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => { reset(); setIsAvailable(true); }}
            className="btn bg-white text-gray-700 border rounded px-4 py-2"
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
}
