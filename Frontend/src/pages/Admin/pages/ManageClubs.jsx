import React, { useEffect, useState } from "react";
import { Search, Eye, Trash2 } from "lucide-react";
import AddClub from "../components/AddClub";

export default function ManageClubs() {
  const [search, setSearch] = useState("");
  const [club, setClub] = useState(false);

  // All clubs (original unfiltered list)
  const [allClubs] = useState([
    {
      id: 1,
      name: "Club1",
      emailClub: "Club1@gmail.com",
      phone: "+91 9876543210",
      emailAdmin: "Club1admin@gmail.com",
      status: "Activated",
    },
    {
      id: 2,
      name: "Club2",
      emailClub: "Club2@gmail.com",
      phone: "+91 9876543210",
      emailAdmin: "Club2admin@gmail.com",
      status: "Activated",
    },
    {
      id: 3,
      name: "Club3",
      emailClub: "Club3@gmail.com",
      phone: "+91 9876543210",
      emailAdmin: "Club3admin@gmail.com",
      status: "Disactivated",
    },
    {
      id: 3,
      name: "Club3",
      emailClub: "Club3@gmail.com",
      phone: "+91 9876543210",
      emailAdmin: "Club3admin@gmail.com",
      status: "Disactivated",
    },
    {
      id: 3,
      name: "Club3",
      emailClub: "Club3@gmail.com",
      phone: "+91 9876543210",
      emailAdmin: "Club3admin@gmail.com",
      status: "Disactivated",
    },
    {
      id: 3,
      name: "Club3",
      emailClub: "Club3@gmail.com",
      phone: "+91 9876543210",
      emailAdmin: "Club3admin@gmail.com",
      status: "Disactivated",
    },
    {
      id: 3,
      name: "Club1",
      emailClub: "Club3@gmail.com",
      phone: "+91 9876543210",
      emailAdmin: "Club3admin@gmail.com",
      status: "Disactivated",
    },
    {
      id: 2,
      name: "Club2",
      emailClub: "Club3@gmail.com",
      phone: "+91 9876543210",
      emailAdmin: "Club3admin@gmail.com",
      status: "Disactivated",
    },
    // ... Add more as needed
  ]);

  // State for currently displayed (filtered) clubs
  const [clubs, setClubs] = useState(allClubs);

  // Filter clubs when search changes
  useEffect(() => {
    if (search.trim() === "") {
      setClubs(allClubs); // reset to full list
    } else {
      const filtered = allClubs.filter((club) =>
        club.name.toLowerCase().includes(search.toLowerCase())
      );
      setClubs(filtered);
    }
  }, [search, allClubs]);

  const deleteClub = () => {
    // Your deletion logic here
  };

  return (
    <section>
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Clubs</h1>

        <div className="flex gap-2">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-64 rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Add Club Button */}
          <button className="btn" onClick={() => setClub(true)}>
            + Add Club
          </button>
        </div>
      </header>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email Club</th>
              <th className="px-4 py-3">Phone Number</th>
              <th className="px-4 py-3">Email Admin Club</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-[.7rem] text-gray-500">
            {clubs.map((club, idx) => (
              <tr key={`${club.id}-${idx}`} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-4 py-3">{club.name}</td>
                <td className="px-4 py-3">{club.emailClub}</td>
                <td className="px-4 py-3">{club.phone}</td>
                <td className="px-4 py-3">{club.emailAdmin}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium w-25 justify-center ${
                      club.status === "Activated"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {club.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    className={`rounded px-3 py-1 text-xs font-medium w-25 ${
                      club.status === "Activated"
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {club.status === "Activated" ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    onClick={deleteClub}
                    className="rounded p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button className="rounded p-1 text-gray-500 hover:text-gray-700">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Club Modal */}
        {club && <AddClub club={club} setClub={setClub} />}

        {/* Pagination */}
        <div className="flex items-center justify-end border-t gap-5 border-gray-200 w-full px-4 py-3">
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
