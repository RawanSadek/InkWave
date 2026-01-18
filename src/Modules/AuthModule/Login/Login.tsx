import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { VscMail } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  return (
    <form className="mt-5">
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="capitalize main-gold-text">
          email
        </label>
        <div className="rounded-lg ring-[0.3px] ring-[#bf8b14] focus-within:ring-1 outline-0 w-full p-3 flex justify-start items-center gap-2">
          <VscMail className="secondary-text" size={22} />
          <input
            type="text"
            id="email"
            className="main-gold-text text-sm outline-0 w-full px-3 disabled:opacity-70"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2 mt-6">
        <label htmlFor="password" className="capitalize main-gold-text">
          password
        </label>
        <div className="rounded-lg ring-[0.3px] ring-[#bf8b14] focus-within:ring-1 outline-0 w-full p-3 flex justify-start items-center gap-2">
          <IoLockClosedOutline className="secondary-text" size={22} />
          <input
            type={showPass ? "text" : "password"}
            id="password"
            className="main-gold-text text-sm outline-0 w-full px-3 disabled:opacity-70"
            placeholder="Enter your password"
          />
          {showPass ? (
            <FaRegEyeSlash
              onClick={() => setShowPass(false)}
              className="secondary-text cursor-pointer"
              size={22}
            />
          ) : (
            <FaRegEye
              onClick={() => setShowPass(true)}
              className="secondary-text cursor-pointer"
              size={22}
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-8">
        <button
          type="submit"
          className="capitalize font-semibold main-gold-bg rounded-lg w-full hover:opacity-85 cursor-pointer disabled:opacity-50 disabled:cursor-progress p-3"
        >
          sign in
        </button>
        <div className="flex justify-between items-center">
          <Link
            to="/register"
            className="text-xs md:text-sm secondary-text underline underline-offset-2 text-center capitalize"
          >
            register
          </Link>
          <Link
            to="/forgot-password"
            className="text-xs md:text-sm secondary-text underline underline-offset-2 text-center"
          >
            forgot password?
          </Link>
        </div>
      </div>
    </form>
  );
}
