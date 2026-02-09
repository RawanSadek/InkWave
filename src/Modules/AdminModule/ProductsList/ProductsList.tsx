import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { axiosInstances, PRODUCTS_URLs } from "../../../Services/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { categoriesFormData, productsFormData } from "../../../Services/INTERFACES";
import { IMG_VALIDATION, REQUIRED_FIELD } from "../../../Services/VALIDATIONS";
import noImg from "../../../assets/Images/noImage.png";
import loadingImg from "../../../assets/Images/loading4.gif";
import { FaRegEye } from "react-icons/fa";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import { FiUpload } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RiLoader2Fill } from "react-icons/ri";

export default function ProductsList() {

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);


  const navigate = useNavigate();

useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axiosInstances.get(PRODUCTS_URLs.GET_ALL);
        setProducts(response.data);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error.response?.data?.message || "Something went wrong");
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
    {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="capitalize text-3xl main-gold-text font-semibold">
            Products  management
          </h2>
          <p className="secondary-text my-3 ">
            Manage your product catalog
          </p>
        </div>

        <div>
          <button
            onClick={() => navigate('/dashboard/product-data/new')}
            className="transition-all duration-300 main-gold-bg font-semibold px-5 py-3 rounded-lg flex items-center gap-2 hover:opacity-80 cursor-pointer focus:outline-none mt-5 md:mt-0"
          >
            <span className="text-2xl">+</span> Add New Product
          </button>
        </div>
      </div>

      {/* Products */}
      {loading && (
        <div className="flex justify-center items-center mt-20">
          <img src={loadingImg} alt="loading" className="w-[20%]" />
        </div>
      )}

      {!loading && (
        <div className="my-10 grid  gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 *:p-5 *:ring-[0.3px] *:ring-[#bf8b14] *:rounded-lg *:shadow-sm">
          {products.map((product: productsFormData) => (
            <div
              key={product?.id}
              className="h-75 md:h-87.5 secondary-bg hover:ring-[0.5px] transition-all duration-300"
            >
              <div className="w-full h-[75%]">
                {/* Product Img */}
                <img
                  src={product?.images && product?.images.length > 0 ? product?.images[0] : noImg}
                  alt="product img"
                  draggable={false}
                  className="w-full h-full"
                  // onError={(e) => {
                  //   const img = e.currentTarget;
                  //   img.onerror = null; // prevent infinite loop
                  //   img.src = noImg;
                  // }}
                />
              </div>
              <div className=" mt-3 overflow-x-hidden">
                {/* Product Name */}
                <h3 className="text-sm md:text-lg main-gold-text font-semibold">
                  {product?.name}
                </h3>

                  {/* Product Price */}
                <p className="text-sm secondary-text">
                  EGP {product?.price.toFixed(2)}
                </p>
                <div className=" flex justify-end gap-3 *:cursor-pointer *:p-1">
                  <FaRegEye
                    onClick={() => {
                      
                    }}
                    className="secondary-text rounded-lg hover:bg-[#8d8d8d30] text-[28px] md:text-[28px]"
                  />
                  <MdOutlineEdit
                    onClick={() => {
                      
                    }}
                    className="main-gold-text rounded-lg hover:bg-[#bc9c0024] text-[30px] md:text-[30px]"
                    // size={30}
                  />
                  <BiTrash
                    onClick={() => {
                      
                    }}
                    className="text-red-600 rounded-lg hover:bg-[#a1000024] text-[28px] md:text-[30px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}</>
  )
}
