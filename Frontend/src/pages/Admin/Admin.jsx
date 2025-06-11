// src/pages/Admin/Admin.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Sidebar from './components/Sidebar';
import ManageClubs from './pages/ManageClubs';
import RoomsReservations from './pages/RoomsReservations';
import MaterialsReservations from './pages/MaterialsReservations';
import ManageRooms from './pages/ManageRooms';
import Users from './pages/Users';

import { Contex } from '../../App';

export default function Admin() {
  const navigate = useNavigate();
  const { role } = useContext(Contex);

  /* ---- hard gate: only super_admin allowed ---- */
  useEffect(() => {
    if (role !== 'super_admin') {
      navigate('/login');            // or navigate('/login');
    }
  }, [role, navigate]);
  /* --------------------------------------------- */

  const [active, setActive] = useState('manage-clubs');
  const token = Cookies.get('auth_token');

  const pageMap = {
    'manage-clubs':           <ManageClubs token={token} />,
    'rooms-reservations':     <RoomsReservations token={token} />,
    "materials-reservations": <MaterialsReservations token={token} />,
    'manage-rooms':           <ManageRooms token={token}  />,
    'users':                  <Users token={token} />,
  };

  return (
    <div className="flex h-screen bg-[#624de3] text-gray-900">
      <Sidebar active={active} onSelect={setActive} token={token} />
      <main className="flex-1 bg-white rounded-l-[2rem] overflow-y-auto p-6">
        {pageMap[active]}
      </main>
    </div>
  );
}
