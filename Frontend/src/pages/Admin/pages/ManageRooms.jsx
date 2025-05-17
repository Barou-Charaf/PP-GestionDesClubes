import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import AddRoom from "../components/AddRoom";

const initialData = [
  { id: 1, name: "Salle 1", availability: "Activated" },
  { id: 2, name: "Salle 2", availability: "Activated" },
  { id: 3, name: "Salle 3", availability: "Disactivated" },
];

export default function ManageRooms() {
  const [room,setRoom]=useState(false);
  
  const deleteRoom =(id)=>{
    console.log("deleted room is : ",id);
  }
 
  const disableEnableRoom =(id)=>{
    // logiq to desible or enable room
  }

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Rooms</h1>
        <button 
        onClick={()=>{setRoom(true)}}
        className="btn">
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
            {initialData.map((row, idx) => {
              const isEven = idx % 2 === 0;
              const badgeStyles =
                row.availability === "Activated"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700";

              return (
                <tr key={row.id} className={isEven ? "bg-gray-50" : ""}>
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium w-25 justify-center  ${badgeStyles}`}
                    >
                      {row.availability}
                    </span>
                  </td>
                  <td className="flex gap-3 justify-center py-3">
                    <button
                     onClick={
                      ()=>{
                        disableEnableRoom(row.id);
                      }
                     }
                      className={`rounded px-3 py-1 text-xs font-medium btn w-20 ${
                        row.availability === "Activated"
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {row.availability === "Activated" ? "Disable" : "Enable"}
                    </button>
                    <button
                    onClick={()=>{
                      deleteRoom(row.id)
                    }}
                    className="rounded p-1 text-gray-500 hover:text-gray-700">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>

        {
          room && <AddRoom room={room} setRoom={setRoom} />
        }

        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <span className="text-sm text-gray-700">Previous</span>
          <div className="inline-flex gap-1 text-sm">
            <button className="px-2 py-1 rounded bg-indigo-600 text-white">1</button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">2</button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">3</button>
          </div>
          <span className="text-sm text-gray-700">Next</span>
        </div>
      </div>
    </section>
  );
}
