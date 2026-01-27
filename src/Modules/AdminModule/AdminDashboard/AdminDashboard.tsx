import { useEffect, useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { GoTag } from "react-icons/go";
import { MdOutlineCancel, MdOutlinePendingActions } from "react-icons/md";
import { PiArrowArcLeftBold, PiShoppingBagOpen } from "react-icons/pi";
import {
  axiosInstances,
  CATEGORIES_URLs,
  ORDERS_URLs,
  PRODUCTS_URLs,
} from "../../../Services/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import numLoader from "../../../assets/Images/num-loader.gif";
// import loadingImg from "../../../assets/Images/loading4.gif";
import { useNavigate } from "react-router-dom";
import { TbBoxOff } from "react-icons/tb";
import { TfiDropbox } from "react-icons/tfi";
import { RiLoader2Fill } from "react-icons/ri";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [todaysOrders, setTodaysOrders] = useState([]);
  const [cancelledOrders, setCancelledOrdes] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosInstances.get(CATEGORIES_URLs.GET_ALL);
      setCategories(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstances.get(PRODUCTS_URLs.GET_ALL);
      setProducts(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axiosInstances.get(ORDERS_URLs.GET_ALL);
      setOrders(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
    // getAllOrders();
    // getPendingOrders
  }, []);

  return (
    <>
      {/* Header */}
      <div className="">
        <div>
          <h2 className="capitalize text-3xl main-gold-text font-semibold">
            Dashboard
          </h2>
          <p className="secondary-text my-3 ">
            Welcome to InkWave Admin Portal
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 my-10">
        {/* Total Products */}
        <div className="ring-[0.3px] ring-[#bf8b14] rounded-lg p-5 secondary-bg flex flex-col justify-between items-start gap-3">
          <div className="bg-[#2b7ffc1a] rounded-xl p-3">
            <BsBoxSeam className="text-[#2b7dfc]" size={22} />
          </div>
          <p className="secondary-text capitalize">total products</p>
          {!loading ? (
            <p className="main-gold-text text-[30px] font-semibold">
              {products.length}
            </p>
          ) : (
            <RiLoader2Fill className="main-gold-text animate-spin text-lg" />
          )}
        </div>

        {/* Total categories */}
        <div className="ring-[0.3px] ring-[#bf8b14] rounded-lg p-5 secondary-bg flex flex-col justify-between items-start gap-3">
          <div className="bg-[#ab46ff1a] rounded-xl p-3">
            <GoTag className="text-[#ab46ff]" size={22} />
          </div>
          <p className="secondary-text capitalize">total categories</p>
          {!loading ? (
            <p className="main-gold-text text-[30px] font-semibold">
              {categories.length}
            </p>
          ) : (
            <RiLoader2Fill className="main-gold-text animate-spin text-lg" />
          )}
        </div>

        {/* Out of Stock Products */}
        <div className="ring-[0.3px] ring-[#bf8b14] rounded-lg p-5 secondary-bg flex flex-col justify-between items-start gap-3">
          <div className="bg-[#00c9501a] rounded-xl p-3">
            <TbBoxOff className="text-[#00c950]" size={22} />
          </div>
          <p className="secondary-text capitalize">out of stock</p>
          {!loading ? (
            <p className="main-gold-text text-[30px] font-semibold">
              {pendingOrders.length}
            </p>
          ) : (
            <RiLoader2Fill className="main-gold-text animate-spin text-lg" />
          )}
        </div>

        {/* Total Orders */}
        <div className="ring-[0.3px] ring-[#bf8b14] rounded-lg p-5 secondary-bg flex flex-col justify-between items-start gap-3">
          <div className="bg-[#bf8b141a] rounded-xl p-3">
            <TfiDropbox className="main-gold-text" size={22} />
          </div>
          <p className="secondary-text capitalize">low stock products</p>
          {!loading ? (
            <p className="main-gold-text text-[30px] font-semibold">
              {orders.length}
            </p>
          ) : (
            <RiLoader2Fill className="main-gold-text animate-spin text-lg" />
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-10 *:ring-[0.3px] *:ring-[#bf8b14] *:rounded-lg *:p-5 *:w-full *:md:w-1/2">
        {/* Quick Actions */}
        <div className="secondary-bg ">
          <h4 className="main-gold-text font-semibold text-xl capitalize">
            quick actions
          </h4>
          <div className="mt-4 flex flex-col justify-between items-start gap-3 *:w-full *:capitalize *:hover:bg-[#2a2a2aa1] *:font-semibold">
            <div
              onClick={() =>
                navigate("/dashboard/categories-list", {
                  state: { openFlag: true, mode: "add" },
                })
              }
              className="rounded-lg main-gold-text px-5 py-3 bg-[#2a2a2a] cursor-pointer hover"
            >
              <span className="text-2xl">+</span> create category
            </div>
            <div
              onClick={() =>
                navigate("/dashboard/products-list", {
                  state: { openFlag: true, mode: "add" },
                })
              }
              className="rounded-lg main-gold-text px-5 py-3 bg-[#2a2a2a] cursor-pointer hover"
            >
              <span className="text-2xl">+</span> add new product
            </div>
            <div
              onClick={() =>
                navigate("/dashboard/orders-list", {
                  state: { openFlag: true, mode: "add" },
                })
              }
              className="rounded-lg main-gold-text px-5 py-3 bg-[#2a2a2a] cursor-pointer hover flex justify-start items-center gap-2"
            >
              <PiShoppingBagOpen size={20} /> view orders
            </div>
          </div>
        </div>

        <div className="secondary-bg ">
          <h4 className="main-gold-text font-semibold text-xl capitalize">
            recent activities
          </h4>
          <div className="mt-4 flex flex-col justify-between items-start gap-3 *:w-full *:capitalize">

            {/* Todays Orders */}
            <div className="flex justify-start items-center gap-2 py-1.5">
              <div className=" bg-[#00c9501a] h-full  p-1.5 rounded-lg">
                <PiArrowArcLeftBold className="text-[#00c950]" size={18} />
              </div>
              <div className="flex flex-col justify-between items-start">
                <p className="main-gold-text text-sm">today's orders</p>
                <small className="secondary-text">
                  {todaysOrders.length < 1 && "no orders received today"}
                  {todaysOrders.length === 1 && todaysOrders.length + " order"}
                  {todaysOrders.length > 1 && todaysOrders.length + " orders"}
                </small>
              </div>
            </div>

            {/* Pending Orders */}
            <div className="flex justify-start items-center gap-2 py-1.5">
              <div className=" bg-[#2b7dfc1a] h-full  p-1.5 rounded-lg">
                <MdOutlinePendingActions className="text-[#2b7dfc]" size={18} />
              </div>
              <div className="flex flex-col justify-between items-start">
                <p className="main-gold-text text-sm">pending orders</p>
                <small className="secondary-text">
                  {pendingOrders.length < 1 && "no pending orders"}
                  {pendingOrders.length === 1 && pendingOrders.length + " order"}
                  {pendingOrders.length > 1 && pendingOrders.length + " orders"}
                </small>
              </div>
            </div>

            {/* Cancelled Orders */}
            <div className="flex justify-start items-center gap-2 py-1.5">
              <div className=" bg-[#ab46ff1a] h-full  p-1.5 rounded-lg">
                <MdOutlineCancel className="text-[#ab46ff]" size={18} />
              </div>
              <div className="flex flex-col justify-between items-start">
                <p className="main-gold-text text-sm">cancelled orders</p>
                <small className="secondary-text">
                  {cancelledOrders.length < 1 && "no cancelled orders"}
                  {cancelledOrders.length === 1 && cancelledOrders.length + " order"}
                  {cancelledOrders.length > 1 && cancelledOrders.length + " orders"}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
