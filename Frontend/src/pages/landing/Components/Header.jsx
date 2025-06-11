import { Link, useNavigate } from "react-router-dom";
import ensetLogo from "../../../assets/ensetLogo.png";
import { useState, useRef, useEffect } from 'react';

// React Query v5
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function Header({ login }) {
  const navigate = useNavigate();

  // Fetch clubs
  const {
    data: clubs = [],
    isLoading: clubsLoading,
    isError: clubsError,
  } = useQuery({
    queryKey: ['clubs'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:8000/api/clubs', {
        headers: { 'Content-Type': 'application/json' }
      });
      return res.data.data;
    },
  });

  return (
    // 📌 Added relative + high z-index so dropdown is always on top
    <header className="relative z-[1000] flex justify-between h-20 items-center w-full">
      <span className="flex items-center gap-6">
        <img src={ensetLogo} alt="Ensetlogo" className="w-40" />
        <ul className="flex flex-wrap justify-center p-3 text-sm font-medium text-gray-500">
          <Link
            to="/"
            className="border-[1.5px] border-transparent py-1 px-3 hover:text-gray-900 hover:border-violet-400 rounded active:scale-98"
          >
            <li>Home</li>
          </Link>

          <li className="border-[1.5px] border-transparent py-1 mr-2 hover:text-gray-900 hover:border-violet-400 rounded active:scale-98">
            <ClubDropdown
              options={clubs}
              isLoading={clubsLoading}
              isError={clubsError}
            />
          </li>

          <Link
            to="/events"
            className="border-[1.5px] border-transparent py-1 px-3 hover:text-gray-900 hover:border-violet-400 rounded active:scale-98"
          >
            <li>Events</li>
          </Link>
          <Link
            to="/announcements"
            className="border-[1.5px] border-transparent py-1 px-3 hover:text-gray-900 hover:border-violet-400 rounded active:scale-98"
          >
            <li>Announcement</li>
          </Link>
        </ul>
      </span>

      {login ? (
        <button></button>
      ) : (
        <button className="btn">
          <Link to="/login">Log In</Link>
        </button>
      )}
    </header>
  );
}

const ClubDropdown = ({ options = [], isLoading, isError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (id) => {
    navigate(`/clubs/${id}`);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-8 flex gap-3 items-center"
      >
        Clubs
        <FontAwesomeIcon icon={faChevronDown} className="text-[.7rem]" />
      </button>

      {isOpen && (
        <ul className="absolute z-[1000] mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          {isLoading ? (
            <li className="px-4 py-2 text-gray-500">Loading clubs…</li>
          ) : isError ? (
            <li className="px-4 py-2 text-red-500">Failed to load</li>
          ) : options.length > 0 ? (
            options.map((club) => (
              <li
                key={club.id}
                onClick={() => handleNavigate(club.id)}
                className="px-4 py-2 cursor-pointer hover:bg-violet-100 hover:text-violet-700"
              >
                {club.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No clubs found</li>
          )}
        </ul>
      )}
    </div>
  );
};
