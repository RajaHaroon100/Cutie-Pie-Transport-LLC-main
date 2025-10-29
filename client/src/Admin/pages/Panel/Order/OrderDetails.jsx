import React, {useState, useEffect} from "react";
import moment from "moment";
import { FaDotCircle } from 'react-icons/fa';

export default function OrderDetails( {order: initialOrder} ) {
    const [order, setOrder] = useState(initialOrder);
    
    useEffect(() => {
        setOrder(initialOrder);
    }, [initialOrder]);

    return(
        <>
            <h2 className="text-xl font-bold mb-1">Order Detials</h2>
            <div className="flex mb-1 mt-2 text-sm">
                <h3>Order Placed on</h3>
                <p className="ml-1 font-semibold">
                    {moment(order.createdAt).format("MMMM Do, YYYY, h:mm a")}
                </p>
            </div>

            <div className="mb-6">
                <p className="text-sm">Order Status: {order.status}</p>
            </div>

            {order.status != 'Request' &&
                <div className="mb-6">
                    <p className="text-base">Order Id: <strong className="text-orange-900">CPT-{order.trackingId}</strong></p>
                </div>
            }

            <div className="cursor-default">
                <h2>Personal Details</h2>
                <div className="p-4 my-2 border rounded-md border-secondary bg-gray-50">
                    <div className="grid grid-cols-2 gap-x-4">
                        <div>
                            <p className="text-sm">Full Name</p>
                            <p className="font-semibold">{order.personalDetails.fullName}</p>
                        </div>
                        <div>
                            <p className="text-sm">Email</p>
                            <p className="font-semibold">{order.personalDetails.email}</p>
                        </div>
                        <div>
                            <p className="text-sm mt-2">Company</p>
                            <p className="font-semibold">
                                {order.personalDetails.company === ""
                                    ? "None"
                                    : order.personalDetails.company}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 pt-2 mt-2 border-t border-gray-300 gap-x-4">
                        <div>
                            <p className="text-sm">Phone Number</p>
                            <p className="font-semibold">{order.personalDetails.phoneNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm">Phone Extension</p>
                            <p className="font-semibold">
                                {order.personalDetails.phoneExtension === ""
                                    ? "None"
                                    : order.personalDetails.phoneExtension}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 cursor-default">
                <h2>Appointment</h2>
                <div className="p-4 my-2 border rounded-md border-secondary bg-gray-50">
                    <div className="grid grid-cols-3 gap-x-4">
                        <div>
                            <p className="text-sm">Date</p>
                            <p className="font-semibold">
                                {moment(order.appointmentDate.date).format("MMMM Do, YYYY")}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm">Time</p>
                            <p className="font-semibold">{order.appointmentDate.time}</p>
                        </div>
                        <div>
                            <p className="text-sm">Time Zone</p>
                            <p className="font-semibold">{order.appointmentDate.timeZone}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 cursor-default">
                <h2>Quote Details</h2>

                <div className="p-4 my-2 border rounded-md border-secondary bg-gray-50">
                    <div className="grid grid-cols-3 gap-x-4">
                        <div>
                            <p className="text-sm">Quote Type</p>
                            <p className="font-semibold">{order.formData.quoteType}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 pt-2 mt-2 border-t border-gray-300 gap-x-6">
                        <div className="col-span-2">
                            <p className="text-sm">Equipment Type</p>
                            <p className="font-semibold">{order.formData.selectedEquipment}</p>
                        </div>
                        {order.formData.selectedEquipment === "Temperature Controlled" && (
                            <>
                                <div>
                                    <p className="text-sm">Min. Temperature</p>
                                    <p className="font-semibold">
                                        {order.formData.temperature.minTemp}&deg;F
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm">Max. Temperature</p>
                                    <p className="font-semibold">
                                        {order.formData.temperature.maxTemp}&deg;F
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="grid grid-cols-3 pt-2 mt-2 border-t border-gray-300 gap-x-6">
                        <div>
                            <p className="text-sm">Shipping From</p>
                            <p className="font-semibold">
                                {order.formData.selectedShippingCountry}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm">Address</p>
                            <p className="font-semibold">{order.addresses.pickupAddress}, {order.formData.shippingAddress}</p>
                        </div>
                        {order.formData.quoteType === "LTL" && (
                            <div className="mt-2">
                                <p className="text-sm">Location Type</p>
                                <p className="font-semibold">{order.formData.shippingLocationType}</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 pt-2 mt-2 border-t border-gray-300 gap-x-6">
                        <div>
                            <p className="text-sm">Additional Shipping Location Details</p>
                            <p className="font-semibold">
                                {order.formData.additionalShippingLocations.length > 0
                                    ? order.formData.additionalShippingLocations.join(" & ")
                                    : "None"}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 pt-2 mt-2 border-t border-gray-300 gap-x-6">
                        <div>
                            <p className="text-sm">Shipping To</p>
                            <p className="font-semibold">
                                {order.formData.selectedDeliveryCountry}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm">Address</p>
                            <p className="font-semibold">{order.addresses.deliveryAddress},{order.formData.deliveryAddress}</p>
                        </div>
                        {order.formData.quoteType === "LTL" && (
                            <div className="mt-2">
                                <p className="text-sm">Location Type</p>
                                <p className="font-semibold">{order.formData.deliveryLocationType}</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 pt-2 mt-2 border-t border-gray-300 gap-x-6">
                        <div>
                            <p className="text-sm">Additional Delivery Location Details</p>
                            <p className="font-semibold">
                                {order.formData.additionalDeliveryLocations.length > 0
                                    ? order.formData.additionalDeliveryLocations.join(" & ")
                                    : "None"}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 pt-2 mt-2 border-t border-gray-300 gap-x-6">
                        <div>
                            <p className="text-sm">Pickup Date</p>
                            <p className="font-semibold">
                                {moment(order.formData.pickupDate).format("MMMM Do, YYYY")}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm">Delivery Date</p>
                            <p className="font-semibold">
                                {moment(order.formData.deliveryDate).format("MMMM Do, YYYY")}
                            </p>
                            <p className="text-xs text-amber-700">
                                
                            </p>
                        </div>
                        <div>
                            <p className="text-sm">Distance</p>
                            <p className="font-semibold">
                                {order.formData.distance.toFixed(0)} Miles
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 pt-2 mt-2 border-t border-gray-300 gap-x-6">
                        <div>
                            <p className="text-sm">Additional Services</p>
                            <p className="font-semibold">
                                {order.formData.additionalServices.length > 0
                                    ? order.formData.additionalServices.join(", ")
                                    : "None"}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 pt-2 mt-2 border-t border-gray-300 gap-x-6">
                        <div>
                            <p className="text-sm">Items </p>
                            <p className="text-xs">Dimension is length x width x height cubic inch</p>
                            <div className="font-semibold">
                                {order.formData.items.length > 0
                                    ? order.formData.items.map((item, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <FaDotCircle className="mr-2 max-w-2 text-text_1" />{" "}
                                            {item.description + ": "}
                                            {item.numPallets + " "}
                                            {item.packaging === 'Pallet (48"x40")' ||
                                                item.packaging === 'Pallet (48"x48")' ||
                                                item.packaging === "Pallet (Custom Dimensions)"
                                                ? "Pallets"
                                                : item.packaging === "Box"
                                                    ? "Boxes"
                                                    : item.packaging + "s"}
                                            , {item.weight} pounds, {item.length}x{item.width}x{item.height} cubic inch, {item.condition}
                                        </div>
                                    ))
                                    : "None"}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 pt-2 mt-2 border-t border-gray-300 gap-x-6">
                        <div>
                            <p className="text-sm">Shipment Weight</p>
                            <p className="font-semibold">
                                {(
                                    order.formData.TRAILER_CONFIG.maxWeight - order.formData.availableWeight
                                ).toFixed(2)}{" "}
                                Pounds
                            </p>
                        </div>
                        <div>
                            <p className="text-sm">Shipment Volume</p>
                            <p className="font-semibold">
                                {(
                                    (order.formData.TRAILER_CONFIG.length *
                                        order.formData.TRAILER_CONFIG.width *
                                        order.formData.TRAILER_CONFIG.height -
                                        order.formData.availableVolume) /
                                    1728
                                ).toFixed(2)}{" "}
                                Cubic Meter
                            </p>
                        </div>
                    </div>

                    {order.formData.quoteType === "LTL" && (
                        <div className="grid grid-cols-2 pt-2 mt-2 border-t border-gray-300 gap-x-6">
                            <div>
                                <p className="text-sm">Shipment Freight Class</p>
                                <p className="font-semibold">{order.formData.shipmentFreightClass}</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 pt-2 mt-2 border-t border-gray-300 gap-x-6">
                        <div>
                            <p className="text-sm">Quote Price</p>
                            <p className="font-semibold">{order.formData.quotePrice} USD</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
