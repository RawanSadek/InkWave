import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { axiosInstances, CATEGORIES_URLs } from "../../../Services/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { categoriesFormData } from "../../../Services/INTERFACES";
import { REQUIRED_FIELD, URL_VALIDATION } from "../../../Services/VALIDATIONS";
import noImg from "../../../assets/Images/noImage.png";
import loadingImg from "../../../assets/Images/loading4.gif";
import { FaRegEye } from "react-icons/fa";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit" | "view">();
  const [selectedCategory, setSelectedCategory] =
    useState<categoriesFormData | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<categoriesFormData>();

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

  const getCategoryById = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstances.get(CATEGORIES_URLs.GET_BY_ID(id));
      setSelectedCategory(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  const onSubmit = async (data: categoriesFormData) => {
    if (formMode === "add") {
      try {
        const response = await axiosInstances.post(
          CATEGORIES_URLs.CREATE,
          data
        );
        toast.success("Category created successfully"); //to be replced by the backend one
        setCategories(response.data);
        setFormOpen(false);
        reset();
        // getAllCategories();
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } else if (formMode === "edit" && selectedCategory?.id) {
      try {
        const response = await axiosInstances.put(
          CATEGORIES_URLs.UPDATE(selectedCategory.id),
          data
        );
        toast.success("Category updated successfully"); //to be replced by the backend one
        setCategories(response.data);
        setFormOpen(false);
        reset();
        // getAllCategories();
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (formMode === "edit" || formMode === "view") {
      reset({
        imageUrl: selectedCategory?.imageUrl,
        name: selectedCategory?.name,
      });
    } else if (formMode === "add") {
      reset({
        imageUrl: "",
        name: "",
      });
    }
  }, [formMode, selectedCategory, reset]);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="capitalize text-3xl main-gold-text font-semibold">
            categories management
          </h2>
          <p className="secondary-text my-3 ">
            Organize your product categories
          </p>
        </div>

        <div>
          <button
            onClick={() => {
              reset();
              setFormMode("add");
              setFormOpen(true);
            }}
            className="transition-all duration-300 main-gold-bg font-semibold px-5 py-3 rounded-lg flex items-center gap-2 hover:opacity-80 cursor-pointer focus:outline-none mt-5 md:mt-0"
          >
            <span className="text-2xl">+</span> Add New Category
          </button>
        </div>
      </div>

      {/* Categories */}
      {loading && (
        <div className="flex justify-center items-center mt-20">
          <img src={loadingImg} alt="loading" className="w-[20%]" />
        </div>
      )}

      {!loading && (
        <div className="my-10 grid  gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 *:p-5 *:ring-[0.3px] *:ring-[#bf8b14] *:rounded-lg *:shadow-sm">
          {categories.map((category: categoriesFormData) => (
            <div
              key={category?.id}
              className="h-[250px] md:h-[300px] secondary-bg hover:ring-[0.5px] transition-all duration-300"
            >
              <div className="w-full h-[75%]">
                <img
                  src={category?.imageUrl}
                  alt="category img"
                  draggable={false}
                  className="w-full h-full"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null; // prevent infinite loop
                    img.src = noImg;
                  }}
                />
              </div>
              <div className=" mt-3 overflow-x-hidden">
                <h3 className="text-sm md:text-lg main-gold-text font-semibold">
                  {category?.name}
                </h3>
                <div className=" flex justify-end gap-3 *:cursor-pointer *:p-1">
                  <FaRegEye
                    onClick={() => {
                      getCategoryById(category?.id);
                      setFormMode("view");
                      setFormOpen(true);
                    }}
                    className="text-white rounded-lg hover:bg-[#adadad24] text-[20px] md:text-[28px]"
                  />
                  <MdOutlineEdit
                    onClick={() => {
                      getCategoryById(category?.id);
                      setFormMode("edit");
                      setFormOpen(true);
                    }}
                    className="main-gold-text rounded-lg hover:bg-[#bc9c0024] text-[20px] md:text-[30px]"
                    // size={30}
                  />
                  <BiTrash className="text-red-600 rounded-lg hover:bg-[#a1000024] !p-2 text-[35px] md:text-[35px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Popup -  Add/Edit new category */}
      {formOpen && (
        <div
          id="categories-form"
          className="flex justify-center items-center bg-[#0000005f] backdrop-blur-xs overflow-y-auto overflow-x-hidden fixed z-50 w-full inset-0 max-h-full"
        >
          <div className="relative p-7 sm:w-[75%] md:w-[60%] lg:w-[35%] max-w-2xl max-h-full ring-[0.3px] ring-[#bf8b14] rounded-lg secondary-bg">
            {/*  Modal header */}
            <div className="">
              <h2 className="text-2xl font-medium main-gold-text">
                Create Category
              </h2>
            </div>
            {/* <!-- Modal body --> */}
            {loading && (
              <div className="flex justify-center items-center my-10">
                <img src={loadingImg} alt="loading" className="w-[20%]" />
              </div>
            )}
            {!loading && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                action=""
                className="mt-5"
              >
                {/* Category Name */}
                <div className="my-4">
                  <label
                    htmlFor="category-name"
                    className="mb-2 text-sm font-medium main-gold-text"
                  >
                    Category Name
                  </label>
                  <input
                  disabled={formMode === "view"}
                    type="text"
                    id="category-name"
                    className="mt-2 main-gold-text text-sm rounded-lg ring-[0.3px] ring-[#bf8b14] focus:ring-1 outline-0 w-full p-3 disabled:opacity-70"
                    {...register("name", REQUIRED_FIELD("Category name"))}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Category Image */}
                <div className="my-4">
                  <label
                    htmlFor="category-img"
                    className="mb-2 text-sm font-medium main-gold-text"
                  >
                    Image URL
                  </label>
                  <input
                  disabled={formMode === "view"}
                    type="text"
                    id="category-img"
                    className="mt-2 main-gold-text text-sm rounded-lg ring-[0.3px] ring-[#bf8b14] focus:ring-1 outline-0 w-full p-3 disabled:opacity-70"
                    {...register("imageUrl", URL_VALIDATION)}
                  />
                  {errors.imageUrl && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.imageUrl.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 my-5 *:py-2 cursor-pointer">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="capitalize main-gold-bg rounded-lg w-[75%] hover:opacity-85 disabled:opacity-50 disabled:cursor-progress"
                  >
                    save
                  </button>
                  <button
                    onClick={() => {
                      setFormOpen(false);
                      reset();
                    }}
                    disabled={isSubmitting}
                    className="capitalize main-gold-text ring-[0.2px] rounded-lg w-[25%] hover:bg-[#2c2c2c] disabled:opacity-50 disabled:cursor-progress"
                  >
                    cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
