// src/App.jsx
import './App.css';
import 'react-toastify/dist/ReactToastify.css';         // 1) Toastify CSS

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';       // 2) ToastContainer

import Landing from './pages/landing/Landing.jsx';
import Login from './pages/login/Login.jsx';
import Notfound from './pages/login/Notfound.jsx';
import AllClubs from './pages/clubs/AllClubs.jsx';
import ClubProfile from './pages/clubs/ClubProfile.jsx';
import Allevents from './pages/events/Allevents.jsx';
import Event from './pages/events/Event.jsx';
import AllAnnouncements from './pages/Anouncements/AllAnnouncements.jsx';
import Announcement from './pages/Anouncements/Announcement.jsx';
import Admin from './pages/Admin/Admin.jsx';

export const Contex = createContext();

function App() {
  const queryClient = new QueryClient();
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <Contex.Provider value={{ login, setLogin, role, setRole }}>
        <Router>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='*' element={<Notfound />} />

            {/* Clubs */}
            <Route path='/clubs'>
              <Route path=':id' element={<ClubProfile />} />
            </Route>

            {/* Events */}
            <Route path='/events'>
              <Route index element={<Allevents />} />
              <Route path=':id' element={<Event />} />
            </Route>

            {/* Announcements */}
            <Route path='/announcements'>
              <Route index element={<AllAnnouncements />} />
              <Route path=':id' element={<Announcement />} />
            </Route>
          </Routes>
        </Router>

        {/* 3) ToastContainer at the app root: */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Contex.Provider>
    </QueryClientProvider>
  );
}

export default App;
