import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import Logo from "../../../assets/EnsetLogo.png"
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

const MENU_ITEMS = [
  { id: "manage-clubs",           label: "Manage Clubs",             Icon: LayoutGrid },
  { id: "rooms-reservations",     label: "Rooms Reservations",       Icon: Building2 },
  { id: "materials-reservations", label: "Materials Reservations",   Icon: Boxes },
  { id: "manage-rooms",           label: "Manage Rooms",             Icon: ClipboardList },
  { id: "users",                  label: "Users",                    Icon: UsersIcon },
];

export default function Sidebar({ active, onSelect }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        relative flex flex-col mx-5 text-white
        transition-all duration-300
        ${collapsed ? "w-20" : "w-57"}
      `}
    >
      {/* Logo */}
      <div className="flex justify-center border-b-[.07rem] border-gray-400  h-40">
        <img
          src={Logo}
          alt="ENSET Logo"
          className={`w-[70%]  transition-opacity duration-200 ${
            collapsed ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute btn -right-7 p-0 size-10 top-14 flex -mr-3 items-center justify-center
                   rounded-full bg-white text-[#624de3] shadow border "
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
            onClick={onSelect}
          />
        ))}
      </nav>

      {/* Spacer + Logout */}
      <div className={` mt-auto self-center ${! collapsed && "w-50"}  px-2 pb-6 `}>
        <button
        className={`flex  items-center gap-4 bg-white w-full p-2 rounded btn text-[#624de3] justify-center font-semibold
         
            `}
        >
            <LogOut size={18} />
         <span
         className={`${collapsed && "hidden"}`}
         >Log out</span>
        </button>
{/* 
<button
          id="logout"
          label="Log out"
          Icon={LogOut}
          active={false}
          collapsed={collapsed} */}
          {/* onClick={() => {
            /* TODO: call your auth/logout */
        //   }}
        // ></button> */}
        }
      </div>
    </aside>
  );
}
