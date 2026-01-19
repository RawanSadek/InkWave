import { Outlet } from "react-router-dom";
import logo from "../../../assets/Images/logo.png";

export default function AuthLayout() {
  return (
    <div className="auth-layout flex justify-center items-center overflow-y-auto py-6">
      <div className="bg-[#101010a3] p-10 z-2 rounded-xl w-[75%] md:w-[50%] lg:w-[40%]">
        <img src={logo} alt="logo" className="w-[25%] mx-auto" />
        <h4 className="capitalize secondary-text text-center my-4">
          welcome back
        </h4>
        <Outlet />
      </div>
    </div>
  );
}
