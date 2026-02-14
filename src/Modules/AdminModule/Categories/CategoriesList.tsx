import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { axiosInstances, CATEGORIES_URLs } from "../../../Services/ENDPOINTS";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { categoriesFormData } from "../../../Services/INTERFACES";
import { IMG_VALIDATION, REQUIRED_FIELD } from "../../../Services/VALIDATIONS";
import noImg from "../../../assets/Images/noImage.png";
import loadingImg from "../../../assets/Images/loading4.gif";
// import formLoading from "../../../assets/Images/num-loader.gif";
import { FaRegEye } from "react-icons/fa";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import { FiUpload } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RiLoader2Fill } from "react-icons/ri";

export default function CategoriesList() {
  const location = useLocation();
  const { openFlag, mode } = location.state || {}; // default to empty if no state
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formOpen, setFormOpen] = useState(openFlag || false);
  const [formMode, setFormMode] = useState<"add" | "edit" | "view" | null>(
    mode || null,
  );
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<categoriesFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<categoriesFormData>();

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

  const appendToFormData = (data: categoriesFormData) => {
    const formData = new FormData();

    const categoryPayload = {
      name: data.name,
    };

    formData.append(
      "category",
      new Blob([JSON.stringify(categoryPayload)], {
        type: "application/json",
      }),
    );

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    return formData;
  };

  const onSubmit = async (data: categoriesFormData) => {
    // console.log(data)
    const formData = appendToFormData(data);
    // console.log(formData.get("category"));
    // console.log(formData.get("image"));

    if (formMode === "add") {
      try {
        const response = await axiosInstances.post(
          CATEGORIES_URLs.CREATE,
          formData,
        );
        toast.success("Category created successfully"); //to be replced by the backend one
        setCategories(response.data);
        setFormOpen(false);
        reset();
        setPreview(null);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } else if (formMode === "edit" && selectedCategory?.id) {
      try {
        const response = await axiosInstances.put(
          CATEGORIES_URLs.UPDATE(selectedCategory.id),
          formData,
        );
        toast.success("Category updated successfully"); //to be replced by the backend one
        setCategories(response.data);
        setFormOpen(false);
        reset();
        setPreview(null);
        setSelectedCategory(null);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstances.delete(CATEGORIES_URLs.DELETE(id));
      toast.success(response?.data?.message || "Category deleted successfully");
      setCategories(response.data);
      setIsOpen(false);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axiosInstances.get(CATEGORIES_URLs.GET_ALL);
        setCategories(response.data);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error.response?.data?.message || "Something went wrong");
      }
      setLoading(false);
    })();
    reset();
    setPreview(null);

    if (openFlag) {
      // Clear the location state after initial mount to avoid reopening on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  useEffect(() => {
    if (formMode === "edit" || formMode === "view") {
      // console.log(selectedCategory?.image);
      reset({
        // image: selectedCategory?.image,
        name: selectedCategory?.name,
      });
    } else if (formMode === "add") {
      reset({
        // image: undefined,
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
              setPreview(null);
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
                  src={category?.image}
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
                    className="secondary-text rounded-lg hover:bg-[#8d8d8d30] text-[28px] md:text-[28px]"
                  />
                  <MdOutlineEdit
                    onClick={() => {
                      getCategoryById(category?.id);
                      setFormMode("edit");
                      setFormOpen(true);
                    }}
                    className="main-gold-text rounded-lg hover:bg-[#bc9c0024] text-[30px] md:text-[30px]"
                    // size={30}
                  />
                  <BiTrash
                    onClick={() => {
                      setIsOpen(true);
                      getCategoryById(category?.id);
                    }}
                    className="text-red-600 rounded-lg hover:bg-[#a1000024] text-[28px] md:text-[30px]"
                  />
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
            {/*  Popup header */}
            <div className="">
              <h2 className="text-2xl font-medium main-gold-text">
                Create Category
              </h2>
            </div>
            {/* <!-- Popup body --> */}
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
                    htmlFor="image"
                    className="mb-2 text-sm font-medium main-gold-text"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    disabled={formMode === "view" || isSubmitting}
                    {...register("image", IMG_VALIDATION(formMode))}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      register("image").onChange(e);
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                    className={`block mt-2 text-sm text-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#bf8b14] file:text-black enabled:hover:file:opacity-80 enabled:hover:file:cursor-pointer disabled:file:cursor-default disabled:file:opacity-50`}
                  />

                  {/* Image preview */}
                  <div className="mt-4 h-50 w-full mx-auto rounded-lg ring-[0.3px] ring-[#bf8b14] overflow-hidden flex justify-center items-center">
                    {/* {preview || selectedCategory?.image && (
                      <img
                        src={preview || selectedCategory?.image}
                        alt="preview"
                        className="w-full h-full "
                      />
                    )} */}
                    {/* {selectedCategory?.image  && (
                      <img
                        src={selectedCategory?.image}
                        alt="preview"
                        className="w-full h-full "
                      />
                    )} */}
                    {/* {!(preview || selectedCategory?.image)
                     && (
                      <FiUpload size={50} className="main-gold-text" />
                    )} */}
                    {preview || selectedCategory?.image ? (
                      <img
                        src={preview || selectedCategory?.image}
                        alt="preview"
                        className="w-full h-full "
                      />
                    ) : (
                      <FiUpload size={50} className="main-gold-text" />
                    )}
                  </div>
                  {errors.image && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.image.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-3 my-5 *:py-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    hidden={formMode === "view"}
                    className={`capitalize main-gold-bg rounded-lg w-[75%] ${formMode !== "view" && "hover:opacity-85 cursor-pointer"} disabled:opacity-50 disabled:cursor-default`}
                  >
                    save
                    {isSubmitting && (
                      <RiLoader2Fill className="text-white animate-spin text-lg inline ms-2" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setFormOpen(false);
                      setPreview(null);
                      reset();
                      setSelectedCategory(null);
                    }}
                    disabled={isSubmitting}
                    className="capitalize main-gold-text ring-[0.2px] rounded-lg w-[25%] hover:bg-[#2c2c2c] cursor-pointer disabled:opacity-50 disabled:cursor-progress"
                  >
                    {formMode === "view" ? "oK" : "cancel"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isOpen && (
        <DeleteConfirmation
          isOpen={isOpen}
          itemName={selectedCategory?.name ?? null}
          entityName="category"
          isLoading={loading}
          onClose={() => {
            setIsOpen(false);
            setSelectedCategory(null);
          }}
          onDelete={() => {
            deleteCategory(selectedCategory!.id);
          }}
        />
      )}
    </>
  );
}
