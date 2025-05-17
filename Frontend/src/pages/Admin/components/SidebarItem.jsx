import React from "react";

export default function SidebarItem({
  id,
  label,
  Icon,
  active,
  collapsed,
  onClick,
}) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`
        flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
        transition-colors mb-3 cursor-pointer ${collapsed && "justify-center" }
        ${active
          ? "bg-white text-[#624de3]"
          : "text-white hover:bg-[#ffffffb4] hover:text-[#624de3]"}
      `}
    >
      <Icon size={collapsed ? 20 :18} />
      <span
        className={`truncate transition-opacity duration-200 ${
          collapsed ? "hidden" : "opacity-100"
        }`}
      >
        {label}
      </span>
    </button>
  );
}