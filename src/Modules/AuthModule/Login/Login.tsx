import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { VscMail } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { REQUIRED_FIELD } from "../../../Services/VALIDATIONS";
import type { loginFormData } from "../../../Services/INTERFACES";
import { AUTH_URLs, axiosInstances } from "../../../Services/ENDPOINTS";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<loginFormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: loginFormData) => {
    try {
      const response = await axiosInstances.post(AUTH_URLs.LOGIN, data);
      toast.success("Welcome to Ink Wave!");
      localStorage.setItem('token', response?.data?.token);
      localStorage.setItem('role', response?.data?.role);
      if (response?.data?.role === 'ADMIN') navigate('/dashboard');
      else
        navigate('/home');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="capitalize main-gold-text">
          email
        </label>
        <div className="rounded-lg ring-[0.3px] ring-[#bf8b14] focus-within:ring-2 outline-0 w-full p-3 flex justify-start items-center gap-2">
          <VscMail className="secondary-text" size={22} />
          <input
            {...register("email", REQUIRED_FIELD('Email'))}
            type="text"
            id="email"
            disabled={isSubmitting}
            className="main-gold-text text-sm outline-0 w-full px-3 disabled:opacity-70"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2 mt-6">
        <label htmlFor="password" className="capitalize main-gold-text">
          password
        </label>
        <div className="rounded-lg ring-[0.3px] ring-[#bf8b14] focus-within:ring-2 outline-0 w-full p-3 flex justify-start items-center gap-2">
          <IoLockClosedOutline className="secondary-text" size={22} />
          <input
            {...register("password", REQUIRED_FIELD('Password'))}
            type={showPass ? "text" : "password"}
            id="password"
            disabled={isSubmitting}
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
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="capitalize font-semibold main-gold-bg rounded-lg w-full hover:opacity-85 cursor-pointer disabled:opacity-50 disabled:cursor-progress p-3"
        >
          sign in
        </button>
        <div className="flex justify-between items-center *:hover:opacity-70">
          <Link
            to="/register"
            className="text-xs md:text-sm secondary-text underline underline-offset-2 text-center capitalize"
          >
            register
          </Link>
          <Link
            to="/forgot-password"
            className="text-xs capitalize md:text-sm secondary-text underline underline-offset-2 text-center"
          >
            forgot password?
          </Link>
        </div>
      </div>
    </form>
  );
}
