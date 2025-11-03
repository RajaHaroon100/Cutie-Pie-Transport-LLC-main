import SortSVG from '../../../../../assets/SVGs/sort.svg'

export default function SortDialog( {title, orderArray, handleSortClick, handleSortOptionClick, isSortDialogOpen, sortCriteria} ) {
    return(
        <div className='text-xl font-bold p-4 border-b border-gray-300 shadow-md sticky top-0 bg-gray-100'>
            <div className='flex justify-between'>
                <h2 className="">
                    {title}
                    <span className='ml-4 text-xs bg-gray-900 text-gray-100 px-2 py-1 rounded-full'>{orderArray.length}</span>
                </h2>
                <img
                    className='cursor-pointer max-w-6 hover:max-w-7 transition-all'
                    src={SortSVG}
                    alt="sort-svg"
                    onClick={handleSortClick}
                />
                {isSortDialogOpen && (
                    <div className="absolute text-base font-semibold right-0 mt-8 w-48 bg-white border border-gray-300 shadow-lg rounded-lg p-2 z-10">
                        <p>Sort by <span className='text-xs'>(Earliest First)</span></p>
                        <button
                            className="block w-full font-normal text-left p-2 border-b hover:bg-gray-200 rounded"
                            onClick={() => handleSortOptionClick('Pickup Date')}
                        >
                            Pickup Date
                        </button>
                        <button
                            className="block w-full font-normal text-left p-2 border-b hover:bg-gray-200 rounded"
                            onClick={() => handleSortOptionClick('Delivery Date')}
                        >
                            Delivery Date
                        </button>
                        <button
                            className="block w-full font-normal text-left p-2 hover:bg-gray-200 rounded"
                            onClick={() => handleSortOptionClick('Order Placed')}
                        >
                            Order Placed
                        </button>
                    </div>
                )}
            </div>
            <p className='text-xs font-normal mt-1'>Sorted by: {sortCriteria === null ? "None" : sortCriteria}</p>
        </div>
    );
}

