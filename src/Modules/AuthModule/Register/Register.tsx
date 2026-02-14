import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { registerFormData } from "../../../Services/INTERFACES";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_URLs, axiosInstances } from "../../../Services/ENDPOINTS";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { VscMail } from "react-icons/vsc";
import {
  CONFIRM_PASSWORD_VALIDATION,
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "../../../Services/VALIDATIONS";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RiLoader2Fill } from "react-icons/ri";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<registerFormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: registerFormData) => {
    try {
      const response = await axiosInstances.post(AUTH_URLs.REGISTER, data);
      toast.success(response?.data?.message || "Welcome to Ink Wave!");
      navigate("/home");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(
        error.response?.data.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  useEffect(() => {
    if (watch("confirmPassword")) trigger("confirmPassword");
  }, [watch("password")]);

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
            {...register("email", EMAIL_VALIDATION)}
            type="text"
            id="email"
            className="main-gold-text text-sm outline-0 w-full px-3 disabled:opacity-70"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="password" className="capitalize main-gold-text">
          password
        </label>
        <div className="rounded-lg ring-[0.3px] ring-[#bf8b14] focus-within:ring-2 outline-0 w-full p-3 flex justify-start items-center gap-2">
          <IoLockClosedOutline className="secondary-text" size={22} />
          <input
            {...register("password", PASSWORD_VALIDATION)}
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
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="confirmPassword" className="capitalize main-gold-text">
          confirmPassword
        </label>
        <div className="rounded-lg ring-[0.3px] ring-[#bf8b14] focus-within:ring-2 outline-0 w-full p-3 flex justify-start items-center gap-2">
          <IoLockClosedOutline className="secondary-text" size={22} />
          <input
            {...register(
              "confirmPassword",
              CONFIRM_PASSWORD_VALIDATION(watch("password")),
            )}
            type={showConfirmPass ? "text" : "password"}
            id="confirmPassword"
            className="main-gold-text text-sm outline-0 w-full px-3 disabled:opacity-70"
            placeholder="Confirm your password"
          />
          {showConfirmPass ? (
            <FaRegEyeSlash
              onClick={() => setShowConfirmPass(false)}
              className="secondary-text cursor-pointer"
              size={22}
            />
          ) : (
            <FaRegEye
              onClick={() => setShowConfirmPass(true)}
              className="secondary-text cursor-pointer"
              size={22}
            />
          )}
        </div>
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">
            {errors.confirmPassword.message}
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
          sign Up
          {isSubmitting && (
            <RiLoader2Fill className="text-white animate-spin text-lg inline ms-2" />
          )}
        </button>
        <div className="flex justify-between items-center *:hover:opacity-70">
          <Link
            to="/login"
            className="text-xs md:text-sm secondary-text underline underline-offset-2 text-center capitalize"
          >
            login
          </Link>
        </div>
      </div>
    </form>
  );
}
