import React from "react";

const initialData = [
  {
    id: 1,
    roomName: "Salle 1",
    club: "Club1",
    reason: "ENSET challenge",
    date: "2025-05-10",
    startTime: "10:00",
    endTime: "12:00",
    status: "Pending",
  },
  {
    id: 2,
    roomName: "Salle 2",
    club: "Club2",
    reason: "ENSET challenge",
    date: "2025-05-11",
    startTime: "14:00",
    endTime: "16:00",
    status: "Accepted",
  },
  {
    id: 3,
    roomName: "Salle 3",
    club: "Club3",
    reason: "ENSET challenge",
    date: "2025-05-12",
    startTime: "08:00",
    endTime: "10:00",
    status: "Rejected",
  },
];

export default function RoomsReservations() {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold">
        Manage Rooms Reservations
      </h1>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full table-auto border-collapse text-sm text-center">
          <thead className="bg-gray-100 font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">Id Reservation</th>
              <th className="px-4 py-3">Salle Name</th>
              <th className="px-4 py-3">Club</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Start Time</th>
              <th className="px-4 py-3">End Time</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {initialData.map((row, idx) => {
              const isEven = idx % 2 === 0;
              const badgeStyles = {
                Pending:  "bg-yellow-100 text-yellow-700",
                Accepted: "bg-green-100  text-green-700",
                Rejected: "bg-red-100    text-red-700",
              }[row.status];

              return (
                <tr key={row.id} className={isEven ? "bg-gray-50" : ""}>
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.roomName}</td>
                  <td className="px-4 py-3">{row.club}</td>
                  <td className="px-4 py-3">{row.reason}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.startTime}</td>
                  <td className="px-4 py-3">{row.endTime}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${badgeStyles}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 flex px-3 items-center gap-2 ">
                    <button
                      className={`rounded px-3 py-1 text-xs font-medium  my-2 w-20 ${
                        row.status === "Pending"
                          ? "bg-green-500 text-white hover:bg-green-600 btn"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={row.status !== "Pending"}
                    >
                      Accept
                    </button>
                    <button
                      className={`rounded px-3 py-1 btn text-xs font-medium w-20 ${
                        row.status === "Pending"
                          ? "bg-red-500 text-white hover:bg-red-600 btn"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={row.status !== "Pending"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>

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
