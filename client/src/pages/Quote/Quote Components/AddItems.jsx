import React, { useEffect, useState } from "react";
import AddItemModule from "./AddItemModule";
import ItemList from "./ItemList";
import { toast } from 'react-hot-toast';
import { FaPlusCircle, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';
import ItemSVG from '../../../assets/SVGs/item-package.svg'



const AddItems = ( { setTrailerConfig, onItemsChange, onVolumeChange, onWeightChange, setAddedItems, setAddedVolume, setAddedWeight } ) => {
  const TRAILER_CONFIG = {
    length: setTrailerConfig.length, // in inches
    width: setTrailerConfig.width,  // in inches
    height: setTrailerConfig.height, // in inches
    maxWeight: setTrailerConfig.maxWeight, // in pounds
  };

  const [items, setItems] = useState([]);
  const [availableVolume, setAvailableVolume] = useState(TRAILER_CONFIG.length * TRAILER_CONFIG.width * TRAILER_CONFIG.height);
  const [availableWeight, setAvailableWeight] = useState(TRAILER_CONFIG.maxWeight);
  const [itemToEdit, setItemToEdit] = useState(null);

  const [openAddItemBox, setOpenAddItemBox] = useState(false);

  const calculateItemVolume = (item) => ((item.length * item.width * item.height) * item.numPallets);

  useEffect(() => {
    if(setAddedItems) setItems(setAddedItems)
    if(setAddedVolume) setAvailableVolume(setAddedVolume)
    if(setAddedWeight) setAvailableWeight(setAddedWeight)
  }, [])

  useEffect(() => {
    onItemsChange(items);
    window.scrollTo({
        top: 400,
        behavior: 'smooth',
    });
  }, [items])

  useEffect(() => {
    onVolumeChange(availableVolume)
  }, [availableVolume])

  useEffect(() => {
    onWeightChange(availableWeight)
  }, [availableWeight])

  const handleAddItem = (newItem) => {
    const itemVolume = calculateItemVolume(newItem);
    if (itemVolume > availableVolume || newItem.weight > availableWeight) {
      toast.error("Item not added. Addition of this item exceeds available trailer volume!", {
        duration: 6000,
        style: {
          border: '1px solid #fdb516',
          padding: '16px',
          color: '#111827',
          background: '#fbbf24'
        },
        iconTheme: {
          primary: '#111827',
          secondary: '#fbbf24',
        },
      });
      return;
    } else {
      setOpenAddItemBox(false);
    }

    setItems([...items, newItem]);

    setAvailableVolume(availableVolume - itemVolume);
    setAvailableWeight(availableWeight - newItem.weight);
  };

  const handleEditItem = (index, updatedItem) => {
    const oldItem = items[index];
    const oldItemVolume = calculateItemVolume(oldItem);
    const newItemVolume = calculateItemVolume(updatedItem);
    
    const volumeDifference = newItemVolume - oldItemVolume;
    const weightDifference = updatedItem.weight - oldItem.weight;

    if (volumeDifference > availableVolume || weightDifference > availableWeight) {
        toast.error("Item not updated. The changes exceed available trailer volume!", {
            duration: 6000,
            style: {
                border: '1px solid #fdb516',
                padding: '16px',
                color: '#111827',
                background: '#fdb516'
            },
            iconTheme: {
                primary: '#111827',
                secondary: '#fdb516',
            },
        });
        itemToEdit(index)
        return;
    } else {
      setOpenAddItemBox(false);
    }
    
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;

    setItems(updatedItems);
    setAvailableVolume(availableVolume - volumeDifference);
    setAvailableWeight(availableWeight - weightDifference);

    setItemToEdit(null);
  };
  
  const handleAddClick = () => {
    setOpenAddItemBox(true)
  }

  const handleClose = () => {
    setOpenAddItemBox(false)
    setItemToEdit(null);
  }

  const handleRemoveItem = (index) => {
    const itemToRemove = items[index];
    const itemVolume = calculateItemVolume(itemToRemove);

    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    setAvailableVolume(availableVolume + itemVolume);
    setAvailableWeight(availableWeight + itemToRemove.weight);
  };

  const recalculateAvailableSpaceAndWeight = (items, oldItemVolume, newItemVolume) => {
    const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);
    const totalVolume = items.reduce((acc, item) => acc + calculateItemVolume(item), 0);

    setAvailableVolume(TRAILER_CONFIG.length * TRAILER_CONFIG.width * TRAILER_CONFIG.height - totalVolume + (oldItemVolume - newItemVolume));
    setAvailableWeight(TRAILER_CONFIG.maxWeight - totalWeight);
  };

  return (
    <div className='font-sans flex flex-col items-center mb-8 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col w-full sm:w-2/3'>
            <div className='flex flex-col items-center mb-8'>
                <img className='w-32 mb-6' src={ItemSVG} alt="item-svg" />
                <h2 className='text-2xl sm:text-3xl text-heading_1 font-semibold text-center'>
                    What <span className='text-heading_2'>items</span> are you shipping?
                </h2>
                <p className="mt-2 text-sm sm:text-base text-subHeading_1">
                    <span className="text-red-500 text-xl">*</span> Indicates a required field
                </p>
            </div>
            <ItemList
                items={items}
                onEditItem={(index) => setItemToEdit({ ...items[index], index })}
                onRemoveItem={handleRemoveItem}
                onEditClick={handleAddClick}
            />
            
            <div className="mb-8 w-full text-xs flex flex-col sm:flex-row justify-between items-center">
                <p>Total Volume of your Shipment: <span className="font-semibold">{(((TRAILER_CONFIG.length * TRAILER_CONFIG.width * TRAILER_CONFIG.height)-availableVolume)/1728).toFixed(1)} cubic units</span></p>
                <p className="mt-2 sm:mt-0">Total Weight of your Shipment: <span className="font-semibold">{TRAILER_CONFIG.maxWeight - availableWeight} pounds</span></p>
            </div>
            
            {openAddItemBox === false ?
                <div className="flex flex-col items-center mb-2 md:mb-8">
                    <FaPlusCircle className="text-primary hover:text-secondary w-12 h-12 cursor-pointer" onClick={handleAddClick} />
                    <p className="mt-1 text-sm text-text_1">Add New Item</p>
                </div>
                :
                <div className="p-4 mb-2 md:mb-8 border bg-bg border-bg rounded-lg shadow-md">
                    <div className="flex justify-end">
                        <p className="text-xl font-semibold text-text_1 hover:text-gray-500 cursor-pointer" onClick={handleClose}>x</p>
                    </div>
                    <AddItemModule
                        availableLength={TRAILER_CONFIG.length}
                        availableWidth={TRAILER_CONFIG.width}
                        availableHeight={TRAILER_CONFIG.height}
                        availableWeight={availableWeight}
                        onAddItem={handleAddItem}
                        itemToEdit={itemToEdit}
                        onEditItem={handleEditItem}
                    />
                </div>
            }

            <div className="flex items-center justify-center mt-4">
              <FaInfoCircle className="text-primary mr-1"/>
              <p className="text-sm text-center font-semibold sm:text-base text-subHeading_1">
                Need help regarding pallet sizes?
                <a href="https://www.kampspallets.com/standard-pallet-sizes-with-chart/" target="_blank">
                  <span className="ml-1 hover:text-heading_2 hover:underline">Click here.</span>
                </a>
              </p>
            </div>
        </div>
    </div>
  );
};

export default AddItems;
