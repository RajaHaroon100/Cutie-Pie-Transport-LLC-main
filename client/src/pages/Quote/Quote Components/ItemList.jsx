import React from "react";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const ItemList = ({ items, onEditItem, onRemoveItem, onEditClick }) => {
  return (
    <div>
      {(!items || items.length === 0) ? (
        <div className="font-sans text-center text-lg font-semibold mt-4">No Items Added</div>
      ) : (
        <div className="mb-8 flex flex-col items-center font-sans">
          <p className="mb-4 font-semibold text-xl">Added Items</p>
          {items.map((item, index) => (
            item && (
              <div key={index} className="bg-bg w-full rounded-md shadow-md p-6 mb-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{item.description}</span>
                  <div>
                    <button
                      onClick={() => {
                        onEditItem(index);
                        onEditClick();
                      }}
                      className="text-primary hover:text-secondary mr-4"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="text-red-500 hover:text-secondary"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="text-sm mt-2">
                  {item.numPallets}{" "}
                  {["Pallet (48\"x40\")", "Pallet (48\"x48\")", "Pallet (Custom Dimensions)"].includes(item.packaging)
                    ? "Pallets"
                    : item.packaging === "Box"
                    ? "Boxes"
                    : item.packaging + "s"}
                  , {item.weight} pounds
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );  
};

export default ItemList;
