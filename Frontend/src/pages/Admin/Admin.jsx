import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ManageClubs           from "./pages/ManageClubs";
import RoomsReservations     from "./pages/RoomsReservations";
import MaterialsReservations from "./pages/MaterialsReservations";
import ManageRooms           from "./pages/ManageRooms";
import Users                 from "./pages/Users";

export default function Admin() {
  // track which page is active
  const [active, setActive] = useState("manage-clubs");

  // choose which page to render
  const pageMap = {
    "manage-clubs":           <ManageClubs />,
    "rooms-reservations":     <RoomsReservations />,
    "materials-reservations": <MaterialsReservations />,
    "manage-rooms":           <ManageRooms />,
    "users":                  <Users />,
  };

  return (
    <div className="flex h-screen bg-[#624de3] text-gray-900">
      <Sidebar active={active} onSelect={setActive} />
      <main className="flex-1 bg-white rounded-l-[2rem] overflow-y-auto p-6">
        {pageMap[active]}
      </main>
    </div>
  );
}
