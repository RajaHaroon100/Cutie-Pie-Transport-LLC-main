import React, { useState, useEffect } from 'react';

const AddItemModule = ({ availableLength, availableWidth, availableHeight, availableWeight, onAddItem, itemToEdit, onEditItem }) => {
    const [description, setDescription] = useState('');
    const [packaging, setPackaging] = useState('Pallet (48"x40")');
    const [length, setLength] = useState(48);
    const [width, setWidth] = useState(40);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [numPallets, setNumPallets] = useState(1);
    const [condition, setCondition] = useState('new');
    const [errors, setErrors] = useState({});

        useEffect(() => {
        if (itemToEdit) {
            setDescription(itemToEdit.description);
            setPackaging(itemToEdit.packaging);
            setLength(itemToEdit.length);
            setWidth(itemToEdit.width);
            setHeight(itemToEdit.height);
            setWeight(itemToEdit.weight / itemToEdit.numPallets);
            setNumPallets(itemToEdit.numPallets);
            setCondition(itemToEdit.condition);
        }
    }, [itemToEdit]);

    const handleLengthChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > availableLength) {
            setErrors(prevErrors => ({ ...prevErrors, length: `Length cannot exceed available length of ${availableLength}` }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, length: '' }));
            setLength(value);
        }
    };

    const handleWidthChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > availableWidth) {
            setErrors(prevErrors => ({ ...prevErrors, width: `Width cannot exceed available width of ${availableWidth}` }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, width: '' }));
            setWidth(value);
        }
    };

    const handleHeightChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > availableHeight) {
            setErrors(prevErrors => ({ ...prevErrors, height: `Height cannot exceed available height of ${availableHeight}` }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, height: '' }));
            setHeight(value);
        }
    };

    const handleWeightChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value * numPallets > availableWeight) {
            setErrors(prevErrors => ({ ...prevErrors, weight: `Total weight cannot exceed available weight of ${availableWeight} pounds` }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, weight: '' }));
            setWeight(value);
        }
    };    

    const handleNumPalletsChange = (e) => {
        const value = parseInt(e.target.value, 10);
        const totalWeight = weight * value;
        if (totalWeight > availableWeight) {
            setErrors(prevErrors => ({ ...prevErrors, numPallets: `Total weight cannot exceed available weight of ${availableWeight} pounds` }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, numPallets: '' }));
            setNumPallets(value);
        }
    };

    const handleConditionChange = (e) => {
        setCondition(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!errors.length && !errors.width && !errors.height && !errors.weight) {
            const newItem = {
                description,
                packaging,
                length,
                width,
                height,
                weight: weight * numPallets,
                numPallets,
                condition
            };

            if (itemToEdit) {
                onEditItem(itemToEdit.index, newItem);
            } else {
                onAddItem(newItem);
            }

            // Reset form
            setDescription('');
            setPackaging('Pallet (48"x40")');
            setLength(48);
            setWidth(40);
            setHeight('');
            setWeight('');
            setNumPallets(1);
            setCondition('new');
            setErrors({});
        }
    };

    const totalWeight = weight * numPallets;

    return (
        <form className="font-sans p-1 md:p-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
                {itemToEdit ? 
                    <div>
                        <h2 className='text-xl font-semibold text-subHeading_1 text-center my-4'>Editing {description} Details</h2>
                    </div>
                    : 
                    <div>
                        <h2 className='text-xl font-semibold text-subHeading_1 text-center my-4'>Add New Item Details</h2>
                    </div> 
                }

                <div className="mb-4">
                    <label className="block text-subHeading_1 mb-1">Item description <span className="text-red-500 text-xl">*</span></label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`w-full p-2 border border-secondary hover:border-primary ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                        required
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    <span className='text-sm'>e.g. 'Widgets' not 'Pallet of Widgets'</span>
                </div>

                <div className="mb-4">
                    <label className="block text-subHeading_1 mb-1">Packaging type <span className="text-red-500 text-xl">*</span></label>
                    <select
                        value={packaging}
                        onChange={(e) => {
                            setPackaging(e.target.value);
                            if (e.target.value === 'Pallet (48"x40")') {
                                setLength(48);
                                setWidth(40);
                            } else if (e.target.value === 'Pallet (48"x48")') {
                                setLength(48);
                                setWidth(48);
                            } else {
                                setLength('');
                                setWidth('');
                            }
                        }}
                        className="w-full p-2 border border-secondary hover:border-primary bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    >
                        <option>Pallet (48"x40")</option>
                        <option>Pallet (48"x48")</option>
                        <option>Pallet (Custom Dimensions)</option>
                        <option>Box</option>
                        <option>Crate</option>
                        <option>Bundle</option>
                        <option>Drum</option>
                        <option>Roll</option>
                        <option>Bale</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-subHeading_1 mb-1">
                            Length <span className="text-red-500 text-xl">*</span>
                            <span className='text-sm'> inches</span>
                        </label>
                        <input
                            type="number"
                            value={length}
                            onChange={handleLengthChange}
                            className={`w-full no-arrows p-2 border border-secondary hover:border-primary ${errors.length ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                            placeholder="0"
                            required
                            min={1}
                            disabled={packaging === 'Pallet (48"x40")' || packaging === 'Pallet (48"x48")'}
                        />
                        {errors.length && <p className="text-red-500 text-xs mt-1">{errors.length}</p>}
                    </div>

                    <div>
                        <label className="block text-subHeading_1 mb-1">
                            Width <span className="text-red-500 text-xl">*</span>
                            <span className='text-sm'> inches</span>
                        </label>
                        <input
                            type="number"
                            value={width}
                            onChange={handleWidthChange}
                            className={`w-full no-arrows p-2 border border-secondary hover:border-primary ${errors.width ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                            placeholder="0"
                            required
                            min={1}
                            disabled={packaging === 'Pallet (48"x40")' || packaging === 'Pallet (48"x48")'}
                        />
                        {errors.width && <p className="text-red-500 text-xs mt-1">{errors.width}</p>}
                    </div>

                    <div>
                        <label className="block text-subHeading_1 mb-1">
                            Height <span className="text-red-500 text-xl">*</span>
                            <span className='text-sm'> inches</span>
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={handleHeightChange}
                            className={`w-full no-arrows p-2 border border-secondary hover:border-primary ${errors.height ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                            placeholder="0"
                            required
                            min={1}
                        />
                        {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-subHeading_1 mb-1">
                        Weight of 1 {packaging === "Pallet (Custom Dimensions)" ? "Pallet" : packaging} <span className="text-red-500 text-xl">*</span>
                        <span className='text-sm'> pounds</span>
                    </label>
                    <input
                        type="number"
                        value={weight}
                        onChange={handleWeightChange}
                        className={`w-full no-arrows p-2 border border-secondary hover:border-primary ${errors.weight ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                        placeholder="0"
                        required
                        min={1}
                    />
                    <p className='text-xs text-text_1 mt-1'>Make sure your weight is correct and includes packaging.</p>
                    <p className='text-xs text-text_1'>Underestimated weight can result in a carrier billing adjustment.</p>
                    {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-subHeading_1 mb-1">
                        Number of {packaging === "Pallet (Custom Dimensions)" ? "Pallet" : packaging}{packaging === "Box" ? "es":"s"} <span className="text-red-500 text-xl">*</span>
                    </label>
                    <input
                        type="number"
                        value={numPallets}
                        onChange={handleNumPalletsChange}
                        className={`w-full no-arrows p-2 border border-secondary hover:border-primary ${errors.numPallets ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                        placeholder="pallets"
                        min={1}
                        required
                    />
                    {errors.numPallets && <p className="text-red-500 text-xs mt-1">{errors.numPallets}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-subHeading_1 mb-1">What is the condition of this item? <span className="text-red-500 text-xl">*</span></label>
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <label className="flex items-center space-x-2 mb-2 sm:mb-0">
                            <input
                                type="radio"
                                value="new"
                                checked={condition === 'new'}
                                onChange={handleConditionChange}
                                className='w-4 h-4 min-w-4 appearance-none bg-accent text-primary border border-primary rounded-full checked:bg-primary focus:outline-none focus:ring-primary focus:ring-2'
                            />
                            <p>New</p>
                        </label>
                        <label className='flex items-center space-x-2'>
                            <input
                                type="radio"
                                value="old"
                                checked={condition === 'old'}
                                onChange={handleConditionChange}
                                className='w-4 h-4 min-w-4 appearance-none bg-accent text-primary border border-primary rounded-full checked:bg-primary focus:outline-none focus:ring-primary focus:ring-2'
                            />
                            <p>Used</p>
                        </label>
                    </div>
                </div>

                <div className="text-right text-text_1">
                    Total Item Weight: {totalWeight} pounds
                </div>
            </div>

            <button 
                type="submit"
                className="w-full p-2 bg-primary text-text_1 hover:bg-secondary hover:text-gray-100 font-semibold rounded-md mt-4 transition-colors"
            >
                {itemToEdit ? 'Update Item' : 'Add Item'}
            </button>
        </form>

    );
};

export default AddItemModule;
