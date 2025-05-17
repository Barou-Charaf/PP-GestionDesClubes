import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import AddUser from "../components/AddUser";

const initialData = [
  { id: 1, club: "Club1", email: "Club1@gmail.com" },
  { id: 2, club: "Club2", email: "Club2@gmail.com" },
  { id: 3, club: "Club3", email: "Club3@gmail.com" },
];



export default function Users() {

const [user,setUser]=useState(false);

const deleteUser=(id)=>{
console.log(id)
}

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button
       onClick={()=>{
        setUser(true)
       }}
        className="btn">
          + Add User
        </button>
      </header>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-gray-100 font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Club</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {initialData.map((row, idx) => (
              <tr
                key={row.id}
                className={idx % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-4 py-3  text-center">{row.id}</td>
                <td className="px-4 py-3 text-center">{row.club}</td>
                <td className="px-4 py-3 text-center">{row.email}</td>
                <td className="px-4 py-3 text-center">
                  <button 
                  
                  onClick={()=>{
                    deleteUser(row.id)
                  }}
                  className="rounded p-1 text-gray-500 hover:text-gray-700">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>


      {
        user && <AddUser  user={user} setUser={setUser}/>
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
