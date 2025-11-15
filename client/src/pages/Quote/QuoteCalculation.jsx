import Landing from '../../components/landing';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FTL_RATES } from './Rates';
import { LTL_RATES } from './Rates';
import QuotePriceSVG from '../../assets/SVGs/quote-price.svg';
import StandardLTLSVG from '../../assets/SVGs/standard-ltl.svg';
import DryvanSVG from '../../assets/SVGs/dryvan.svg';
import DryvanTempSVG from '../../assets/SVGs/dryvan-temp.svg';
import moment from 'moment';
import { FaExclamation } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './QuoteCalculation.css';
import warningSVG from '../../assets/SVGs/danger.svg';

 export default function QuoteCalculation() {
    const location = useLocation();
    const formData = location.state;

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [distance, setDistance] = useState(0);
    const [shipmentFreightClass, setShipmentFreightClass] = useState(0);
    const [FTLQuotePrice, setFTLQuotePrice] = useState(0);
    const [LTLQuotePrice, setLTLQuotePrice] = useState(0);

    const [openBreakdownBox, setOpenBreakdownBox] = useState(false);

    const [baseRate, setBaseRate] = useState(0);
    const [temperatureRate, setTemperatureRate] = useState(0);
    // *** Added tarpFee state variable ***
    const [tarpFee, setTarpFee] = useState(0);
    const [additionalLocationTypeRate, setAdditionalLocationTypeRate] = useState(0);
    const [pickupFee, setPickupFee] = useState(0);
    const [servicesCost, setServicesCost] = useState(0);
    const [additionalWeightFee, setAdditionalWeightFee] = useState(0);
    const [overSizedFreightFee, setOverSizedFreightFee] = useState(0);
    const [sameDayDeliveryFee, setSameDayDeliveryFee] = useState(0);
    const [weekendFee, setWeekendFee] = useState(0);

    function handleBreakdownClick() {
        if (openBreakdownBox === false) setOpenBreakdownBox(true);
        else setOpenBreakdownBox(false);
    }

    async function getRouteDistance(coord1, coord2) {
        const apiKey = import.meta.env.VITE_DISTANCE_API_KEY;
        const profile = 'driving-car';
    
        const url = `https://api.openrouteservice.org/v2/directions/${profile}/geojson`;
        
        const body = {
            coordinates: [
                [coord1.longitude, coord1.latitude],
                [coord2.longitude, coord2.latitude]
            ],
            units: 'mi'
        };
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch route data');
            }
    
            const data = await response.json();
            
            const distanceInMiles = data.features[0].properties.segments[0].distance;
            
            return distanceInMiles;
        } catch (error) {
            console.error("Error fetching route distance:", error);
            setError("No distance found.");
            return null;
        }
    }

    const getFreightClass = (density) => {
        if (density >= 50) return 50;
        if (density >= 35) return 55;
        if (density >= 30) return 60;
        if (density >= 22.5) return 65;
        if (density >= 15) return 70;
        if (density >= 13.5) return 77.5;
        if (density >= 12) return 85;
        if (density >= 10.5) return 92.5;
        if (density >= 9) return 100;
        if (density >= 8) return 110;
        if (density >= 7) return 125;
        if (density >= 6) return 150;
        if (density >= 5) return 175;
        if (density >= 4) return 200;
        if (density >= 3) return 250;
        if (density >= 2) return 300;
        if (density >= 1) return 400;
        return 500;
    };

    function calculateFreightClass() {
        const shipmentVolumeInches = (formData.TRAILER_CONFIG.length * formData.TRAILER_CONFIG.width * formData.TRAILER_CONFIG.height) - formData.availableVolume;
        const shipmentWeight = formData.TRAILER_CONFIG.maxWeight - formData.availableWeight;
        const shipmentVolumeFeet = shipmentVolumeInches / 1728;
        const shipmentDensity = shipmentWeight / shipmentVolumeFeet;
        setShipmentFreightClass(getFreightClass(shipmentDensity));
    }

    // *** Modified calculateFTLQuote function ***
    function calculateFTLQuote() {
        let totalCost = 0;
        let baseRate = 0;
        let temperatureRate = 0;
        let tarpFee = 0; // Added for Flatbed
        let additionalLocationTypeRate = 0;
        let pickupDatefee = FTL_RATES.pickupDateFee;
        let servicesCost = 0;
        let additionalWeightFee = 0;
        let sameDayDeliveryFee = 0;
        let weekendFee = 0;

        // Base Rate Calculation
        if (formData.selectedEquipment === 'Dry van') {
            if (formData.selectedShippingCountry === 'Canada' || formData.selectedDeliveryCountry === 'Canada') {
                baseRate = FTL_RATES.canadaRPM * distance;
            } else if (formData.selectedShippingCountry === 'United States' && formData.selectedDeliveryCountry === 'United States') {
                baseRate = FTL_RATES.usRPM * distance;
            }
        } else if (formData.selectedEquipment === 'Temperature Controlled') {
            baseRate = FTL_RATES.temperatureControlledRPM * distance;
            if (formData.temperature.minTemp >= 33 || formData.temperature.maxTemp > 33) {
                temperatureRate = FTL_RATES.firstTemperatureClassRPM * distance;
            } else if ((formData.temperature.minTemp >= 0 && formData.temperature.minTemp < 33) || 
                       (formData.temperature.maxTemp > 0 && formData.temperature.maxTemp <= 33)) {
                temperatureRate = FTL_RATES.secondTemperatureClassRPM * distance;
            } else if (formData.temperature.minTemp >= -20 && formData.temperature.maxTemp <= 0) {
                temperatureRate = FTL_RATES.thirdTemperatureClassRPM * distance;
            }
        } else if (formData.selectedEquipment === 'Flatbed') {
            // Haul categories for Flatbed
            if (distance <= 400) { // Short-haul (0-250) and Mid-haul (250-400)
                baseRate = 6 * distance; // $6 per mile
            } else { // Tweener (401-800), Long-haul (800-1,200), Extended-long (1,200+)
                baseRate = 3 * distance; // $3 per mile
            }
            // Tarp Fee: $75 per tarp (only if tarp is selected: "4 ft", "6 ft", "8 ft")
            if (formData.tarpSelection && formData.tarpSelection !== "No Tarp Required") {
                tarpFee = 75; // $75 per tarp
            }
        }

        if (formData.shippingAddress === formData.deliveryAddress) {
            if (formData.selectedShippingCountry === 'Canada' || formData.selectedDeliveryCountry === 'Canada') {
                baseRate = FTL_RATES.canadaSameCity;
            } else if (formData.selectedShippingCountry === 'United States' && formData.selectedDeliveryCountry === 'United States') {
                baseRate = FTL_RATES.usSameCity;
            }
        }

        setBaseRate(baseRate);
        setTemperatureRate(temperatureRate);
        setTarpFee(tarpFee); // Set tarp fee for breakdown

        const hasNoDockTightSpaceatPickup = formData.additionalShippingLocations.some(
            location => location.toLowerCase() === "no dock / tight space"
        );
        
        if (formData.additionalShippingLocations.length > 0) {
            if (hasNoDockTightSpaceatPickup) {
                additionalLocationTypeRate += FTL_RATES.noDockFee;
                if (formData.additionalShippingLocations.length > 1) {
                    additionalLocationTypeRate += FTL_RATES.additionalLocationTypeFee;
                }
            } else {
                additionalLocationTypeRate += FTL_RATES.additionalLocationTypeFee;
            }
        }
        
        const hasNoDockTightSpaceatDelivery = formData.additionalDeliveryLocations.some(
            location => location.toLowerCase() === "no dock / tight space"
        );
        
        if (formData.additionalDeliveryLocations.length > 0) {
            if (hasNoDockTightSpaceatDelivery) {
                additionalLocationTypeRate += FTL_RATES.noDockFee;
                if (formData.additionalDeliveryLocations.length > 1) {
                    additionalLocationTypeRate += FTL_RATES.additionalLocationTypeFee;
                }
            } else {
                additionalLocationTypeRate += FTL_RATES.additionalLocationTypeFee;
            }
        }

        setAdditionalLocationTypeRate(additionalLocationTypeRate);

        const currentDate = new Date();
        const pickupDate = new Date(formData.pickupDate);

        const timeDifference = pickupDate.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        if (daysDifference > 1) {
            pickupDatefee = Math.max(0, pickupDatefee - (daysDifference - 1) * 10);
        }

        setPickupFee(pickupDatefee);

        if (formData.additionalServices.includes("Heavy and Light Scaling")) servicesCost += FTL_RATES.heavyAndLightScalingFee;
        if (formData.additionalServices.includes("Blind Shipment")) servicesCost += FTL_RATES.blindShipmentFee;
        if (formData.additionalServices.includes("Floor Loaded Items")) servicesCost += FTL_RATES.floorLoadeItemsFee;
        if (formData.additionalServices.includes("Residential Pickup")) servicesCost += FTL_RATES.residentialFee;
        if (formData.additionalServices.includes("Residential Delivery")) servicesCost += FTL_RATES.residentialFee;
        if (formData.additionalServices.includes("Liftgate")) servicesCost += FTL_RATES.liftgateFee;
        if (formData.additionalServices.includes("Pallet Jack at Pickup")) servicesCost += FTL_RATES.palletJackFee;
        if (formData.additionalServices.includes("Pallet Jack at Delivery")) servicesCost += FTL_RATES.palletJackFee;

        setServicesCost(servicesCost);

        const shipmentWeight = formData.TRAILER_CONFIG.maxWeight - formData.availableWeight;

        const weightThreshold = 35000;
        const feePerThousandPounds = FTL_RATES.aboveWeightFee;

        if (shipmentWeight > weightThreshold) {
            const excessWeight = Math.min(shipmentWeight, formData.TRAILER_CONFIG.maxWeight) - weightThreshold;
            additionalWeightFee = Math.ceil(excessWeight / 1000) * feePerThousandPounds;
        }

        setAdditionalWeightFee(additionalWeightFee);

        const deliveryDate = new Date(formData.deliveryDate);
        if (pickupDate.toDateString() === deliveryDate.toDateString()) {
            sameDayDeliveryFee = FTL_RATES.sameDayDeliveryFee;
            setSameDayDeliveryFee(FTL_RATES.sameDayDeliveryFee);
        }

        totalCost = baseRate + temperatureRate + tarpFee + additionalLocationTypeRate + 
                    pickupDatefee + servicesCost + additionalWeightFee + sameDayDeliveryFee;

        if (pickupDate.getDay() === 6 || pickupDate.getDay() === 0 || 
            deliveryDate.getDay() === 6 || deliveryDate.getDay() === 0) {
            weekendFee = totalCost * 0.10;
            setWeekendFee(weekendFee);
            totalCost += weekendFee;
            setWeekendFee(weekendFee);
        }
        
        setFTLQuotePrice(totalCost.toFixed(2));
    }

    function calculateLTLQuote() {
        let totalCost = 0;
        let baseRate = 0;
        let additionalLocationTypeRate = 0;
        let pickupDatefee = LTL_RATES.pickupDateFee;
        let servicesCost = 0;
        let overSizedFreightFee = 0;
        let sameDayDeliveryFee = 0;
        let weekendFee = 0;

        let weightClassAdjustmentFactor = 1 + (shipmentFreightClass/100);

        if (formData.selectedEquipment === 'Standard LTL') {
            if (formData.selectedShippingCountry === 'Canada' || formData.selectedDeliveryCountry === 'Canada') {
                baseRate = LTL_RATES.canadaRPM * distance * weightClassAdjustmentFactor;
            } else if (formData.selectedShippingCountry === 'United States' && formData.selectedDeliveryCountry === 'United States') {
                baseRate = LTL_RATES.usRPM * distance * weightClassAdjustmentFactor;
            }
        }

        if (formData.shippingAddress === formData.deliveryAddress) {
            if (formData.selectedShippingCountry === 'Canada' || formData.selectedDeliveryCountry === 'Canada') {
                baseRate = LTL_RATES.canadaSameCity;
            } else if (formData.selectedShippingCountry === 'United States' && formData.selectedDeliveryCountry === 'United States') {
                baseRate = LTL_RATES.usSameCity;
            }
        }

        setBaseRate(baseRate);

        const hasNoDockTightSpaceatPickup = formData.additionalShippingLocations.some(
            location => location.toLowerCase() === "no dock / tight space"
        );
        
        if (formData.additionalShippingLocations.length > 0) {
            if (hasNoDockTightSpaceatPickup) {
                additionalLocationTypeRate += LTL_RATES.noDockFee;
                if (formData.additionalShippingLocations.length > 1) {
                    additionalLocationTypeRate += LTL_RATES.additionalLocationTypeFee;
                }
            } else {
                additionalLocationTypeRate += LTL_RATES.additionalLocationTypeFee;
            }
        }
        
        const hasNoDockTightSpaceatDelivery = formData.additionalDeliveryLocations.some(
            location => location.toLowerCase() === "no dock / tight space"
        );
        
        if (formData.additionalDeliveryLocations.length > 0) {
            if (hasNoDockTightSpaceatDelivery) {
                additionalLocationTypeRate += LTL_RATES.noDockFee;
                if (formData.additionalDeliveryLocations.length > 1) {
                    additionalLocationTypeRate += LTL_RATES.additionalLocationTypeFee;
                }
            } else {
                additionalLocationTypeRate += LTL_RATES.additionalLocationTypeFee;
            }
        }

        setAdditionalLocationTypeRate(additionalLocationTypeRate);

        const currentDate = new Date();
        const pickupDate = new Date(formData.pickupDate);

        const timeDifference = pickupDate.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        if (daysDifference > 1) {
            pickupDatefee = Math.max(0, pickupDatefee - (daysDifference - 1) * 10);
        }

        setPickupFee(pickupDatefee);

        if (formData.additionalServices.includes("Liftgate at Pickup")) servicesCost += LTL_RATES.liftgateFee;
        if (formData.additionalServices.includes("Liftgate at Delivery")) servicesCost += LTL_RATES.liftgateFee;
        if (formData.additionalServices.includes("Pallet Jack at Pickup")) servicesCost += LTL_RATES.palletJackFee;
        if (formData.additionalServices.includes("Pallet Jack at Delivery")) servicesCost += LTL_RATES.palletJackFee;
        if (formData.additionalServices.includes("Residential Pickup")) servicesCost += LTL_RATES.residentialFee;
        if (formData.additionalServices.includes("Residential Delivery")) servicesCost += LTL_RATES.residentialFee;
        if (formData.additionalServices.includes("Pick up inside the location")) servicesCost += LTL_RATES.insideLocationFee;
        if (formData.additionalServices.includes("Delivery inside the location")) servicesCost += LTL_RATES.insideLocationFee;

        setServicesCost(servicesCost);

        const shipmentVolume = (formData.TRAILER_CONFIG.length * formData.TRAILER_CONFIG.width * formData.TRAILER_CONFIG.height) - formData.availableVolume;
        const shipmentWeight = formData.TRAILER_CONFIG.maxWeight - formData.availableWeight;
        const maxWeight = 45000;
        const maxVolume = formData.TRAILER_CONFIG.length * formData.TRAILER_CONFIG.width * formData.TRAILER_CONFIG.height;
        
        if (shipmentVolume > maxVolume/2 || shipmentWeight > maxWeight/2)
            overSizedFreightFee = LTL_RATES.overweightFee;

        setOverSizedFreightFee(overSizedFreightFee);

        const deliveryDate = new Date(formData.deliveryDate);
        if (pickupDate.toDateString() === deliveryDate.toDateString()) {
            sameDayDeliveryFee = FTL_RATES.sameDayDeliveryFee;
            setSameDayDeliveryFee(FTL_RATES.sameDayDeliveryFee);
        }

        totalCost = baseRate + additionalLocationTypeRate + pickupDatefee + 
            servicesCost + overSizedFreightFee + sameDayDeliveryFee;

        if (pickupDate.getDay() === 6 || pickupDate.getDay() === 0 || 
            deliveryDate.getDay() === 6 || deliveryDate.getDay() === 0) {
            weekendFee = totalCost * 0.10;
            setWeekendFee(weekendFee);
            totalCost += weekendFee;
            setWeekendFee(weekendFee);
        }
        
        setLTLQuotePrice(totalCost.toFixed(2));
    }

    useEffect(() => {
        async function fetchDistance() {
            setLoading(true);
            try {
                const distanceInMiles = await getRouteDistance(formData.shippingCoordinates, formData.deliveryCoordinates);
                setDistance(distanceInMiles);
            } catch (error) {
                console.error("Error fetching distance:", error);
                setError("Unable to fetch distance. Please try again. If issue persists, try by choosing a different nearest location.");
            } finally {
                setLoading(false);
            }
        }
    
        fetchDistance();
        if (formData.quoteType === 'LTL') {
            calculateFreightClass();
        }
    }, [formData]);

    useEffect(() => {
        if (distance > -1) {
            if (formData.quoteType === 'FTL') calculateFTLQuote();
            if (formData.quoteType === 'LTL') calculateLTLQuote();
        }
    }, [distance]);

    const handlePlaceOrderClick = () => {
        const updatedFormData = {
            ...formData,
            distance: distance,
            quotePrice: formData.quoteType === 'FTL' ? FTLQuotePrice : LTLQuotePrice,
            shipmentFreightClass: formData.quoteType === 'LTL' ? shipmentFreightClass : -1
        };

        navigate('/order', { state: updatedFormData, replace: true });
    };

    return (
        <div className='pb-16 font-sans bg-bg'>
            <Landing title="Calculated Quote" />
            <div className='flex flex-col items-center pb-8 mt-16 mx-4 sm:mx-8 md:mx-16 lg:mx-36 rounded-lg shadow-sm bg-accent'>
                <div className='flex flex-col items-center my-8'>
                    <img className='mb-6 max-w-32 min-w-32' src={QuotePriceSVG} alt="quote-price-svg" />
                    <h2 className='text-2xl sm:text-3xl font-semibold text-center text-heading_1'>
                        Estimated <span className='text-heading_2'> Quote Price </span> by our system is
                    </h2>
                </div>
    
                <h2 className='mb-6 text-lg sm:text-xl font-semibold text-center text-subHeading_1'>
                    {formData.quoteType === 'FTL' && "Full Truck Load Quote"}
                    {formData.quoteType === 'LTL' && "Less Than Truck Load Quote"}
                </h2>
    
                {loading ? (
                    <div className='flex flex-col items-center justify-center h-96'>
                        <div className='w-16 h-16 border-t-4 border-solid rounded-full animate-spin border-primary'></div>
                        <p className='mt-4 text-sm'>Calculating...</p>
                    </div>
                ) : error ? (
                    <div className='flex flex-col items-center justify-center w-full sm:w-2/3'>
                        <img className='w-10 mb-2' src={warningSVG} alt="warning-svg"/>
                        <p className='mt-4 text-sm sm:text-lg text-center text-red-600'>
                            We are unable to fetch the distance. Please try again, and if the issue persists, 
                            consider selecting a different nearby location that is accessible by road.
                        </p>
                        <Link to="/quote">
                            <button className="px-4 py-2 sm:px-4 sm:py-3 mt-4 font-semibold rounded-lg shadow-md animated-button-orange bg-primary">
                                <span>Refill Quote Form</span>
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className='pb-12'>
                            <div className='flex flex-col md:flex-row items-center space-x-0 sm:space-x-4 justify-center text-subHeading_1'>
                                <div className='flex flex-col items-center text-subHeading_1 mb-4 md:mb-0'>
                                    {formData.selectedEquipment === 'Dry van' &&
                                        <img className='w-24 md:w-32' src={DryvanSVG} alt="dryvan-svg" />
                                    }
                                    {formData.selectedEquipment === 'Temperature Controlled' &&
                                        <img className='w-24 md:w-32' src={DryvanTempSVG} alt="temperature-dryvan-svg" />
                                    }
                                    {formData.selectedEquipment === 'Standard LTL' &&
                                        <img className='w-24 md:w-32' src={StandardLTLSVG} alt="ltl-dryvan-svg" />
                                    }
                                    <p className='w-32 mt-1 text-xs sm:text-sm font-semibold text-center truncate'>{formData.shippingAddress}</p>
                                    <p className='text-xs sm:text-sm'>{moment(formData.pickupDate).format('MMMM Do, YYYY')}</p>
                                </div>
                                <div className='flex flex-row sm:flex-col items-center justify-center mb-4 md:mb-0'>
                                    <div className='flex flex-col sm:flex-row items-center mx-2'>
                                        <div className='py-3 pl-1 sm:py-0.5 sm:px-8 rounded-lg shadow-md bg-primary'></div>
                                        <div className='p-1 mx-1 my-1 rounded-full shadow-md bg-primary'></div>
                                        <div className='py-3 pl-1 sm:py-0.5 sm:px-8 rounded-lg shadow-md bg-primary'></div>
                                    </div>
                                    <p className='mt-1 text-xs sm:text-sm font-semibold text-text_1'>{distance.toFixed(0)} Miles</p>
                                </div>
                                <div className='flex flex-col items-center text-subHeading_1 mb-4 md:mb-0'>
                                    {formData.selectedEquipment === 'Dry van' &&
                                        <img className='w-24 md:w-32' src={DryvanSVG} alt="dryvan-svg" />
                                    }
                                    {formData.selectedEquipment === 'Temperature Controlled' &&
                                        <img className='w-24 md:w-32' src={DryvanTempSVG} alt="temperature-dryvan-svg" />
                                    }
                                    {formData.selectedEquipment === 'Standard LTL' &&
                                        <img className='w-24 md:w-32' src={StandardLTLSVG} alt="ltl-dryvan-svg" />
                                    }
                                    <p className='w-32 mt-1 text-xs sm:text-sm font-semibold text-center truncate'>{formData.deliveryAddress}</p>
                                    <p className='text-xs sm:text-sm'>{moment(formData.deliveryDate).format('MMMM Do, YYYY')}</p>
                                </div>
                            </div>
    
                            <div className='flex items-center justify-center mt-8 text-5xl sm:text-6xl font-bold'>
                                <h2 className='mr-1 text-4xl sm:text-5xl font-semibold text-heading_1'>$</h2>
                                {FTLQuotePrice != 0 &&
                                    <div className='relative flex items-end'>
                                        <h2 className='z-20'><span className='text-heading_2'>{FTLQuotePrice}</span></h2>
                                        <h2 className='absolute z-0 top-1 left-1 opacity-20 blur-sm'><span>{FTLQuotePrice}</span></h2>
                                        <p className='ml-2 text-xl sm:text-3xl font-semibold text-subHeading_1'>USD</p>
                                    </div>
                                }
                                {LTLQuotePrice != 0 &&
                                    <div className='relative flex items-end'>
                                        <h2 className='z-20'><span className='text-heading_2'>{LTLQuotePrice}</span></h2>
                                        <h2 className='absolute z-0 top-1 left-1 opacity-20 blur-sm'><span>{LTLQuotePrice}</span></h2>
                                        <p className='ml-2 text-xl sm:text-3xl font-semibold text-subHeading_1'>USD</p>
                                    </div>
                                }
                            </div>
    
                            <div className='flex justify-center mt-8'>
                                {formData.selectedShippingCountry === 'Canada' || formData.selectedDeliveryCountry === 'Canada' &&
                                    <div className='flex items-center w-2/3 text-amber-800'>
                                        <FaExclamation className='text-lg sm:text-xl'/>
                                        <p className='ml-2 text-xs sm:text-sm text-center'>
                                            This quote doesn't include customs border fees, which will 
                                            be provided by the customer at the time of transition.
                                        </p>
                                    </div>
                                }
                            </div>
                        </div>
    
                        <div>
                            {!openBreakdownBox &&
                                <p onClick={handleBreakdownClick} className='text-sm cursor-pointer text-heading_1 hover:underline'>View price breakdown</p>
                            }
                            {openBreakdownBox && 
                                <>
                                    <p onClick={handleBreakdownClick} className='text-sm cursor-pointer text-heading_1 hover:underline'>Price Breakdown</p>
                                    <div className='grid grid-cols-2 text-sm sm:text-base p-4 sm:p-6 mt-2 border rounded-md border-primary bg-bg text-text_1 gap-y-4 gap-x-8'>
                                        {baseRate !== 0 &&
                                            <>
                                                <p className='font-medium'>Base Rate</p>
                                                <p className='text-right'>$ {baseRate.toFixed(2)}</p>
                                            </>
                                        }
                                        {temperatureRate !== 0 &&
                                            <>
                                                <p className='font-medium'>Temperature Rate</p>
                                                <p className='text-right'>$ {temperatureRate.toFixed(2)}</p>
                                            </>
                                        }
                                        {/* *** Added tarpFee to price breakdown *** */}
                                        {tarpFee !== 0 &&
                                            <>
                                                <p className='font-medium'>Tarp Fee</p>
                                                <p className='text-right'>$ {tarpFee.toFixed(2)}</p>
                                            </>
                                        }
                                        {additionalLocationTypeRate !== 0 &&
                                            <>
                                                <p className='font-medium'>Location Type Rate</p>
                                                <p className='text-right'>$ {additionalLocationTypeRate.toFixed(2)}</p>
                                            </>
                                        }
                                        {pickupFee !== 0 &&
                                            <>
                                                <p className='font-medium'>Pickup Fee</p>
                                                <p className='text-right'>$ {pickupFee.toFixed(2)}</p>
                                            </>
                                        }
                                        {servicesCost !== 0 &&
                                            <>
                                                <p className='font-medium'>Services Cost</p>
                                                <p className='text-right'>$ {servicesCost.toFixed(2)}</p>
                                            </>
                                        }
                                        {additionalWeightFee !== 0 &&
                                            <>
                                                <p className='font-medium'>Additional Weight Fee</p>
                                                <p className='text-right'>$ {additionalWeightFee.toFixed(2)}</p>
                                            </>
                                        }
                                        {overSizedFreightFee !== 0 &&
                                            <>
                                                <p className='font-medium'>Over Sized Freight Fee</p>
                                                <p className='text-right'>$ {overSizedFreightFee.toFixed(2)}</p>
                                            </>
                                        }
                                        {sameDayDeliveryFee !== 0 &&
                                            <>
                                                <p className='font-medium'>Same Day Delivery Fee</p>
                                                <p className='text-right'>$ {sameDayDeliveryFee.toFixed(2)}</p>
                                            </>
                                        }
                                        {weekendFee !== 0 &&
                                            <>
                                                <p className='font-medium'>Weekend Fee</p>
                                                <p className='text-right'>$ {weekendFee.toFixed(2)}</p>
                                            </>
                                        }
                                    </div>
                                </>
                            }
                        </div>
    
                        <div className='w-2/3 sm:w-1/3 mt-12'>
                            <button onClick={handlePlaceOrderClick} className="w-full px-4 sm:px-4 py-3 font-semibold rounded-lg shadow-md animated-button-orange bg-primary">
                                <span>Proceed to Place Order</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
