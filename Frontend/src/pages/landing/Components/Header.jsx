import { Link, useNavigate } from "react-router-dom";
import ensetLogo from "../../../assets/ensetLogo.png";
import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";                          // 🆕 logout logic

// React Query v5
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Header({ login }) {
  const navigate = useNavigate();

  /* ───── Logout handler (same as sidebar) ───── */
  const handleLogout = () => {
    Cookies.remove("auth_token");

    ["auth_token", "role", "club_id", "isLoggedIn"].forEach((key) =>
      localStorage.removeItem(key)
    );

    // simple redirect to login page
    window.location.href = "/login";
  };
  /* ------------------------------------------- */

  // Fetch clubs
  const {
    data: clubs = [],
    isLoading: clubsLoading,
    isError: clubsError,
  } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/api/clubs", {
        headers: { "Content-Type": "application/json" },
      });
      return res.data.data;
    },
  });

  return (
    /* 📌 relative + high z-index so dropdown is always on top */
    <header className="relative z-[1000] flex h-20 w-full items-center justify-between">
      <span className="flex items-center gap-6">
        <img src={ensetLogo} alt="Ensetlogo" className="w-40" />

        <ul className="flex flex-wrap p-3 text-sm font-medium text-gray-500">
          <Link
            to="/"
            className="active:scale-98 rounded border-[1.5px] border-transparent py-1 px-3 hover:border-violet-400 hover:text-gray-900"
          >
            <li>Home</li>
          </Link>

          <li className="active:scale-98 mr-2 rounded border-[1.5px] border-transparent py-1 hover:border-violet-400 hover:text-gray-900">
            <ClubDropdown
              options={clubs}
              isLoading={clubsLoading}
              isError={clubsError}
            />
          </li>

          <Link
            to="/events"
            className="active:scale-98 rounded border-[1.5px] border-transparent py-1 px-3 hover:border-violet-400 hover:text-gray-900"
          >
            <li>Events</li>
          </Link>

          <Link
            to="/announcements"
            className="active:scale-98 rounded border-[1.5px] border-transparent py-1 px-3 hover:border-violet-400 hover:text-gray-900"
          >
            <li>Announcement</li>
          </Link>
        </ul>
      </span>

      {login ? (
        /* -------- shows only when `login` is true -------- */
        <button onClick={handleLogout} className="btn">
          Log Out
        </button>
      ) : (
        /* -------- shows when `login` is false -------- */
        <button className="btn">
          <Link to="/login">Log In</Link>
        </button>
      )}
    </header>
  );
}

/* ---------------- Club dropdown ---------------- */
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (id) => {
    navigate(`/clubs/${id}`);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-8"
      >
        Clubs
        <FontAwesomeIcon icon={faChevronDown} className="text-[.7rem]" />
      </button>

      {isOpen && (
        <ul className="absolute z-[1000] mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
          {isLoading ? (
            <li className="px-4 py-2 text-gray-500">Loading clubs…</li>
          ) : isError ? (
            <li className="px-4 py-2 text-red-500">Failed to load</li>
          ) : options.length > 0 ? (
            options.map((club) => (
              <li
                key={club.id}
                onClick={() => handleNavigate(club.id)}
                className="cursor-pointer px-4 py-2 hover:bg-violet-100 hover:text-violet-700"
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
