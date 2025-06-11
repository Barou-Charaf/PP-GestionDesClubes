import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import AddRoom from "../components/AddRoom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

export default function ManageRooms({ token }) {
  const [showAdd, setShowAdd] = useState(false);
  const queryClient = useQueryClient();

  // Fetch rooms
  const { data: rooms = [], isLoading, isError, error } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/api/salles", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      return res.data.data;
    },
    enabled: !!token,
  });

  // Delete room
  const deleteMutation = useMutation({
    mutationFn: id =>
      axios.delete(`http://localhost:8000/api/salles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success("Room deleted");
      queryClient.invalidateQueries(["rooms"]);
    },
    onError: err => {
      toast.error("Delete failed: " + (err.response?.data?.message || err.message));
    },
  });

  // Toggle availability
  const toggleMutation = useMutation({
    mutationFn: async ({ id, name, availability }) => {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("availability", availability.toString());
      return axios.post(
        `http://localhost:8000/api/salles/update/${id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Room updated");
      queryClient.invalidateQueries(["rooms"]);
    },
    onError: err => {
      toast.error("Update failed: " + (err.response?.data?.message || err.message));
    },
  });

 if (isLoading) {
    return (
      <div className="flex justify-center text-green-400 items-center py-10 mt-50">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }
  if (isError)   return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Rooms</h1>
        <button onClick={() => setShowAdd(true)} className="btn">
          + Add Room
        </button>
      </header>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full table-auto border-collapse text-sm text-center">
          <thead className="bg-gray-100 font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">Room ID</th>
              <th className="px-4 py-3">Room Name</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((row, idx) => {
              const isEven = idx % 2 === 0;
              const badgeStyles = row.availability
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700";

              return (
                <tr key={row.id} className={isEven ? "bg-gray-50" : ""}>
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium w-25 justify-center ${badgeStyles}`}
                    >
                      {row.availability ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className="flex gap-3 justify-center py-3">
                    <button
                      onClick={() =>
                        toggleMutation.mutate({
                          id: row.id,
                          name: row.name,
                          availability: !row.availability,
                        })
                      }
                      className={`rounded px-3 py-1 text-xs font-medium btn w-20 ${
                        row.availability
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {row.availability ? "Disable" : "Enable"}
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(row.id)}
                      className="rounded p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          
        </table>
        {showAdd && (
            <AddRoom room={showAdd} setRoom={setShowAdd} token={token} />
          )}

        {/* <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <span className="text-sm text-gray-700">Previous</span>
          <div className="inline-flex gap-1 text-sm">
            <button className="px-2 py-1 rounded bg-indigo-600 text-white">1</button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">2</button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">3</button>
          </div>
          <span className="text-sm text-gray-700">Next</span>
        </div> */}
      </div>
    </section>
  );
}
