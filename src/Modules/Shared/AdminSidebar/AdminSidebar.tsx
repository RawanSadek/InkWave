import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import sidebarImage from "../../../assets/Images/logo.png";
import { RiBookShelfLine } from "react-icons/ri";
import { LuLayoutDashboard, LuPackage } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi";
import { GoTag } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "../../../Contexts/AuthContext/AuthContext";

export default function AdminSidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) {
  const { pathname } = useLocation();
  const currentPage = pathname.split("/").pop(); // Get the last part of the path

  const { logout } = useContext(AuthContext);
  
  return (
    <>
      <Sidebar collapsed={collapsed} className="!w-full h-full">
        <div className="flex flex-col justify-between h-full">

          <div>
            {/* Header */}
            <div className="ring-[0.3px] ring-[#cea028]  p-6">
              <img
                onClick={() => setCollapsed(!collapsed)}
                src={sidebarImage}
                alt="logo"
                className={`${collapsed ? 'w-full' : 'w-[60%]'} cursor-pointer`}
              />

              <h5 className={`capitalize mt-3 ${collapsed ? "hidden" : "block"}`}>
                admin portal
              </h5>
            </div>
            <div>
              <Menu
                menuItemStyles={{
                  button: {
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
                className=" mt-5 w-[80%] mx-auto *:capitalize"
              >
                <MenuItem
                  icon={<LuLayoutDashboard size={20} />}
                  component={<Link to="/dashboard" />}
                  className={`rounded-lg px-3 mb-3 ${currentPage === "dashboard"
                      ? "bg-[#cea028] text-black"
                      : "hover:bg-[#2a2a2a] hover:text-[#cea028]"
                    }`}
                >
                  dashboard
                </MenuItem>

                <MenuItem
                  icon={<GoTag size={20} />}
                  component={<Link to="/dashboard/categories-list" />}
                  className={`rounded-lg px-3 mb-3 ${currentPage === "categories-list"
                      ? "bg-[#cea028] text-black"
                      : "hover:bg-[#2a2a2a] hover:text-[#cea028]"
                    }`}
                >
                  categories
                </MenuItem>

                <MenuItem
                  icon={<RiBookShelfLine size={20} />}
                  component={<Link to="/dashboard/products-list" />}
                  className={`rounded-lg px-3 mb-3 ${(currentPage === "products-list"|| currentPage === "new")
                      ? "bg-[#cea028] text-black"
                      : "hover:bg-[#2a2a2a] hover:text-[#cea028]"
                    }`}
                >
                  products
                </MenuItem>

                <MenuItem
                  icon={<LuPackage size={20} />}
                  component={<Link to="/dashboard/orders-list" />}
                  className={`rounded-lg px-3 mb-3 ${currentPage === "orders-list"
                      ? "bg-[#cea028] text-black"
                      : "hover:bg-[#2a2a2a] hover:text-[#cea028]"
                    }`}
                >
                  orders
                </MenuItem>

                <MenuItem
                  icon={<HiOutlineUsers size={20} />}
                  component={<Link to="/dashboard/users-list" />}
                  className={`rounded-lg px-3 mb-3 ${currentPage === "users-list"
                      ? "bg-[#cea028] text-black"
                      : "hover:bg-[#2a2a2a] hover:text-[#cea028]"
                    }`}
                >
                  customers
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div>
            <Menu
              menuItemStyles={{
                button: {
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                },
              }}
              className=" mt-5 w-[80%] mx-auto *:capitalize"
            >
              <MenuItem
                onClick={logout}
                icon={<MdLogout size={20} />}
                component={<Link to='/login'></Link>}
                className={`rounded-lg px-3 mb-3 
                hover:bg-[#2a2a2a] hover:text-[#cea028]
              `}
              >
                logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
