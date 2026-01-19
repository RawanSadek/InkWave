import { FiAlertTriangle } from "react-icons/fi";
import type { DeleteConfirmationProps } from "../../../Services/INTERFACES";
import { IoMdClose } from "react-icons/io";
import { GoAlertFill } from "react-icons/go";
import loadingImg from "../../../assets/Images/loading4.gif";

export default function DeleteConfirmation({
  isOpen,
  itemName = null,
  entityName,
  isLoading,
  onClose,
  onDelete,
}: DeleteConfirmationProps) {
  return (
    <>
      {isOpen && (
        <div className="flex justify-center items-center bg-[#0000005f] backdrop-blur-xs overflow-y-auto overflow-x-hidden fixed z-50 w-full inset-0 max-h-full">
          <div className="w-[75%] md:w-[50%] lg:w-[30%] secondary-bg flex flex-col rounded-lg ">
            {/* Header */}
            <div className="flex justify-between items-center p-6 ring-[0.3px] ring-[#bf8b14] rounded-t-lg ">
              <div className="flex justify-start items-center gap-4">
                <FiAlertTriangle
                  className="text-red-500 rounded-full px-2 bg-[#ac000037] "
                  size={37}
                />
                <h3 className="capitalize main-gold-text font-semibold text-sm md:text-xl">
                  delete confirmation
                </h3>
              </div>
              <IoMdClose
                onClick={onClose}
                className="main-gold-text cursor-pointer"
                size={20}
              />
            </div>

            {/* Body */}
            {itemName === null && (
              <div className="flex justify-center items-center my-10">
                <img src={loadingImg} alt="loading" className="w-[17%]" />
              </div>
            )}
            {itemName && (
              <div className="ring-[0.3px] ring-[#bf8b14] p-6">
                <p className="secondary-text">
                  Are you sure you want to delete{" "}
                  <span className="main-gold-text">{itemName}</span>? This will
                  not delete the products in this {entityName}.
                </p>
                <div className="flex justify-start items-center gap-2 mt-5">
                  <GoAlertFill className="text-yellow-300" />
                  <p className="text-red-500 text-sm">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className={`ring-[0.3px] ring-[#bf8b14] p-6 flex justify-end items-center gap-3 mb-[0.3px] rounded-b-lg ${isLoading? '*:cursor-progress': '*:cursor-pointer'}`}>
              <button
                onClick={onClose}
                disabled={isLoading}
                className={`ring-[0.5px] ring-[#bf8b14] capitalize py-3 px-5 rounded-lg main-gold-text ${!isLoading &&' hover:bg-[#8d8d8d30]'}`}
              >
                cancel
              </button>
              <button
                onClick={onDelete}
                disabled={isLoading}
                className={` bg-red-600 text-white capitalize py-3 px-5 rounded-lg ${!isLoading &&' hover:bg-[#ce0101]'}`}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
