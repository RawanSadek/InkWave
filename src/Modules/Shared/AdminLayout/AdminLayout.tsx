import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex gap-[0.4px] min-h-screen w-full bg-gray-500">
      <div className={`secondary-bg shrink-0 h-screen fixed ${collapsed ? 'w-[80.2px]' : 'w-[287.2px]'} ring-[0.3px] ring-[#bf8b14] transition-all duration-400 secondary-text`}>
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <div className={`flex-1 p-10 bg-[#0a0a0a] overflow-y-auto ${collapsed ? "ml-[80.2px]" : "ml-[287.2px]"} transition-all duration-400` }>
        <Outlet />
      </div>
    </div>
  )
}
