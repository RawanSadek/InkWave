import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { useState } from "react";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen w-screen bg-gray-500">
      <div className={`p-4 bg-red-200 shrink-0 ${collapsed ? 'w-20' : 'w-64'}`}>
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <div className="flex-1 p-10 bg-[#0a0a0a] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
