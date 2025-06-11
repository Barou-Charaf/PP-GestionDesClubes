// src/pages/Admin/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SidebarItem from "./SidebarItem";
import Logo from "../../../assets/EnsetLogo.png";
import {
  LayoutGrid,
  Building2,
  Boxes,
  ClipboardList,
  Users as UsersIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ---------- menu config ---------- */
const MENU_ITEMS = [
  { id: "manage-clubs",           label: "Manage Clubs",           Icon: LayoutGrid },
  { id: "rooms-reservations",     label: "Rooms Reservations",     Icon: Building2 },
  { id: "materials-reservations", label: "Materials Reservations", Icon: Boxes },
  { id: "manage-rooms",           label: "Manage Rooms",           Icon: ClipboardList },
  { id: "users",                  label: "Users",                  Icon: UsersIcon },
];
/* --------------------------------- */

export default function Sidebar({ active, onSelect, token }) {
  const [collapsed, setCollapsed] = useState(false);

  /* ───── On mount: restore last tab ───── */
  useEffect(() => {
    const remembered = localStorage.getItem("admin_last_tab");
    if (remembered && remembered !== active) {
      onSelect(remembered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* -------------------------------------- */

  /* remembers choice whenever user selects */
  const handleSelect = (id) => {
    localStorage.setItem("admin_last_tab", id);
    onSelect(id);
  };

  /* ───── Logout handler ───── */
  const handleLogout = () => {
    Cookies.remove("auth_token");

    ["auth_token", "role", "club_id", "isLoggedIn"].forEach(key =>
      localStorage.removeItem(key)
    );

    // simple redirect to login page
    window.location.href = "/login";
  };
  /* -------------------------- */

  return (
    <aside
      className={`
        relative mx-5 flex flex-col text-white transition-all duration-300
        ${collapsed ? "w-20" : "w-57"}
      `}
    >
      {/* Logo */}
      <div className="flex h-40 justify-center border-b-[.07rem] border-gray-400">
        <img
          src={Logo}
          alt="ENSET Logo"
          className={`w-[70%] transition-opacity duration-200 ${
            collapsed ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-7 top-14 flex size-10 -mr-3 items-center justify-center rounded-full border bg-white p-0 text-[#624de3] shadow btn"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Menu items */}
      <nav className="mt-6 flex flex-col gap-1 px-2">
        {MENU_ITEMS.map((it) => (
          <SidebarItem
            key={it.id}
            {...it}
            active={active === it.id}
            collapsed={collapsed}
            onClick={handleSelect}
          />
        ))}
      </nav>

      {/* Spacer + Logout */}
      <div className={`mt-auto self-center px-2 pb-6 ${!collapsed && "w-50"}`}>
        <button
          onClick={handleLogout}
          className="btn flex w-full items-center justify-center gap-4 rounded bg-white p-2 font-semibold text-[#624de3]"
        >
          <LogOut size={18} />
          <span className={collapsed ? "hidden" : ""}>Log out</span>
        </button>
      </div>
    </aside>
  );
}
