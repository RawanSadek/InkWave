import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import {
  axiosInstances,
  CATEGORIES_URLs,
  PRODUCTS_URLs,
} from "../../../Services/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type {
  categoriesFormData,
  productsFormData,
} from "../../../Services/INTERFACES";
import noImg from "../../../assets/Images/noImage.png";
import loadingImg from "../../../assets/Images/loading4.gif";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TbFilterDollar } from "react-icons/tb";

export default function ProductsList() {
  const [productsLoading, setProductsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState<categoriesFormData | null>(null);
  const [searchText, setSearchText] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  // const minValue = ((minPrice / 100) * 100).toFixed(0);
  // const maxValue = ((maxPrice / 100) * 100).toFixed(2);
  // const [range, setRange] = useState({
  //   min: 0,
  //   max: 1000,
  // });






  const navigate = useNavigate();

  const getProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await axiosInstances.get(
        PRODUCTS_URLs.GET_ALL,
        //   {
        //   params: {
        //     selectedCategory,
        //     searchText,
        //     minPrice,
        //   }
        // }
      );
      setProducts(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setProductsLoading(false);
  };

  useEffect(() => {
    getProducts();

    // Get All Categories
    (async () => {
      setCategoriesLoading(true);
      try {
        const response = await axiosInstances.get(CATEGORIES_URLs.GET_ALL);
        setCategories(response.data);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error.response?.data?.message || "Something went wrong");
      }
      setCategoriesLoading(false);
    })();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="capitalize text-3xl main-gold-text font-semibold">
            Products management
          </h2>
          <p className="secondary-text my-3 ">Manage your product catalog</p>
        </div>

        <div>
          <button
            onClick={() => navigate("/dashboard/product-data/new")}
            className="transition-all duration-300 main-gold-bg font-semibold px-5 py-3 rounded-lg flex items-center gap-2 hover:opacity-80 cursor-pointer focus:outline-none mt-5 md:mt-0"
          >
            <span className="text-2xl">+</span> Add New Product
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8">
        {/* Search & Filter */}
        <div className="flex flex-col justify-start items-start gap-7">
          {/* Filter by Text & Price */}
          <div className="flex flex-col md:flex-row justify-start items-start gap-3 w-full">
            {/* Text */}
            <div className="rounded-lg ring-[0.3px] ring-[#bf8b14] focus-within:ring-1 outline-0 p-3 flex justify-start items-center gap-2 secondary-bg w-[30%]">
              <CiSearch className="secondary-text" size={22} />
              <input
                type="text"
                id="search-text"
                className="main-gold-text text-sm outline-0 w-full px-3 disabled:opacity-70"
                placeholder="Search Products..."
              />
            </div>

            {/* Price */}
            <div className="rounded-lg ring-[0.3px] ring-[#bf8b14] focus-within:ring-2 outline-0 p-3 flex justify-start items-start gap-2 secondary-bg w-[30%]">
              <TbFilterDollar className="secondary-text" size={20} />
              {/* Text Inputs */}
              <div className="flex justify-between items-center gap-10">
                {/* Min */}
                <div>

                  <label htmlFor="minCurrency" className="main-gold-text inline">EGP.</label>
                  <input
                    id="minCurrency"
                    value={minPrice}
                    className="mt-4 border border-[#cea028] rounded-lg p-1 text-[#cea028] inline"
                  />

                </div>
                {/* Max */}
                <div>
                  <label htmlFor="maxCurrency" className="main-gold-text inline">EGP.</label>


                  <input
                    id="maxCurrency"
                    type="text"
                    value={maxPrice}
                    className="mt-4 border border-[#cea028] rounded-lg p-1 text-[#cea028] inline"
                  />
                </div>
              </div>


            </div>
          </div>

          {/* Filter by Category */}
          <div
            className={`rounded-lg max-w-full overflow-x-auto min-h-6 px-1 ${categoriesLoading ? "secondary-bg animate-pulse" : "py-2"}`}
          >
            <div className="flex justify-start items-center gap-3">
              <p
                onClick={() => setSelectedCategory(null)}
                className={`py-3 px-5 rounded-lg font-semibold whitespace-nowrap cursor-pointer ${selectedCategory?.id == null ? "main-gold-bg" : "secondary-bg main-gold-text ring-[0.3px] ring-[#bf8b14] hover:ring-[0.5px]"}`}
              >
                All
              </p>
              {!categoriesLoading &&
                categories.map((category: categoriesFormData) => (
                  <p
                    onClick={() => setSelectedCategory(category)}
                    key={category.id}
                    className={`py-3 px-5 rounded-lg font-semibold whitespace-nowrap cursor-pointer ${selectedCategory?.id == category.id ? "main-gold-bg" : "secondary-bg main-gold-text ring-[0.3px] ring-[#bf8b14] hover:ring-[0.5px]"}`}
                  >
                    {category.name}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div></div>

        {/* Products */}
        {productsLoading && (
          <div className="flex justify-center items-center mt-20">
            <img src={loadingImg} alt="loading" className="w-[20%]" />
          </div>
        )}

        {!productsLoading && (
          <div className="my-10 grid  gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 *:p-5 *:ring-[0.3px] *:ring-[#bf8b14] *:rounded-lg *:shadow-sm">
            {products.map((product: productsFormData) => (
              <div
                key={product?.id}
                className="h-75 md:h-87.5 secondary-bg hover:ring-[0.5px] transition-all duration-300"
              >
                <div className="w-full h-[75%]">
                  {/* Product Img */}
                  <img
                    src={
                      product?.images && product?.images.length > 0
                        ? product?.images[0]
                        : noImg
                    }
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
                      onClick={() => { }}
                      className="secondary-text rounded-lg hover:bg-[#8d8d8d30] text-[28px] md:text-[28px]"
                    />
                    <MdOutlineEdit
                      onClick={() => { }}
                      className="main-gold-text rounded-lg hover:bg-[#bc9c0024] text-[30px] md:text-[30px]"
                    // size={30}
                    />
                    <BiTrash
                      onClick={() => { }}
                      className="text-red-600 rounded-lg hover:bg-[#a1000024] text-[28px] md:text-[30px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div >
    </>
  );
}
