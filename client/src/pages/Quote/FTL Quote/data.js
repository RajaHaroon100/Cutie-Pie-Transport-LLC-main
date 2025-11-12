import DryvanSVG from '../../../assets/SVGs/dryvan.svg'
import DryvanTempSVG from '../../../assets/SVGs/dryvan-temp.svg'
import ScaleSVG from '../../../assets/SVGs/scale.svg'
import EyeSVG from '../../../assets/SVGs/eye.svg'
import FloorLoadedSVG from '../../../assets/SVGs/floor-loaded.svg'
import LiftGateSVG from '../../../assets/SVGs/lift-gate.svg'
import LocationResidentialSVG from '../../../assets/SVGs/location-residential.svg'
import DriverAssistSVG from '../../../assets/SVGs/driver-assist.svg'
import DollarSignSVG from '../../../assets/SVGs/dollar-sign.svg'
import AppointmentFeeSVG from '../../../assets/SVGs/appointment-fee.svg'
import PalletJackSVG from '../../../assets/SVGs/pallet-jack.svg'
import FlatbedSVG from '../../../assets/SVGs/flatbed.png'

export const EQUIPMENT_TYPE = [
    {
        svg: DryvanSVG,
        title: 'Dry van',
        description: 'Fully enclosed truckload trailer.',
        value: 'Dry van',
        helpbox: {
            description: 'Dry van is a fully enclosed truckload trailer and is the most common equipment used for truckload shipments.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">A single, <strong>dedicated</strong> truck will typically transport your shipment</li>
                        <li style="padding-bottom:4px">Shipping is <strong>direct</strong>, resulting in less handling and <strong>faster</strong> transit</li>
                        <li style="padding-bottom:4px">Both pickup and delivery locations require <strong>loading docks</strong></li>
                        <li style="padding-bottom:4px">Total <strong>shipment value</strong> cannot exceed $100,000</li>
                        <li style="padding-bottom:4px">Freight must be loaded (and unloaded) <strong>within 2 hours</strong>, packing freight on <strong>pallets</strong> decreases this time and effort</li>
                        <li style="padding-bottom:4px">The driver <strong>will not assist</strong> in loading or unloading freight</li>
                    </ul>
                </div>`
        }
    },
    {
        svg: DryvanTempSVG,
        title: 'Temperature Controlled',
        description: 'Fully enclosed trailer with climate control unit.',
        value: 'Temperature Controlled',
        helpbox: {
            description: 'Temperature controlled truckload is used when a stable temperature range is required for a shipment.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">A single, <strong>dedicated</strong> truck will typically transport your shipment</li>
                        <li style="padding-bottom:4px">Shipping is <strong>direct</strong>, resulting in less handling and <strong>faster</strong> transit</li>
                        <li style="padding-bottom:4px">Both pickup and delivery locations require <strong>loading docks</strong></li>
                        <li style="padding-bottom:4px">Total <strong>shipment value</strong> cannot exceed $100,000</li>
                        <li style="padding-bottom:4px">The driver will not assist with <strong>loading</strong> or <strong>unloading</strong> the freight from the trailer (freight must be palletized)</li>
                        <li style="padding-bottom:4px">Upon carrier <strong>arrival</strong>, the trailer will need to be loaded/unloaded within <strong>2 hours</strong></li>
                    </ul>
                </div>`
        }
    },
    {
        svg: FlatbedSVG,
        title: 'Flatbed',
        description: 'Open deck equipment that has no roof nor sides.',
        value: 'Flatbed',
        helpbox: {
            description: 'Flatbed equipment is used for oversized or irregularly shaped loads that cannot be transported in enclosed trailers. It requires additional protection like tarps for weather-sensitive freight.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">A single, <strong>dedicated</strong> truck will typically transport your shipment</li>
                        <li style="padding-bottom:4px">Shipping is <strong>direct</strong>, resulting in less handling and <strong>faster</strong> transit</li>
                        <li style="padding-bottom:4px">Pickup and delivery locations do <strong>not require loading docks</strong>; a forklift or crane may be needed</li>
                        <li style="padding-bottom:4px">Total <strong>shipment value</strong> cannot exceed $100,000</li>
                        <li style="padding-bottom:4px">Freight must be loaded/unloaded <strong>within 2 hours</strong>; tarps may be required for weather protection (select tarp size during equipment selection)</li>
                        <li style="padding-bottom:4px">The driver <strong>will not assist</strong> in loading or unloading freight</li>
                    </ul>
                </div>`
        }
    }
];

export const ADDITIONAL_SERVICES = [
    {
        svg: ScaleSVG,
        title: 'Heavy and Light Scaling',
        description: 'When a driver needs to weigh their trailer before and after freight is loaded.',
        value: 'Heavy and Light Scaling',
        helpbox: {
            description: 'When a driver needs to weigh their trailer before and after freight is loaded.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
                            This service means the driver will have their <strong>trailer weighed while it is empty</strong> to 
                            produce a "light scale ticket" and then have it <strong>weighed again after the freight has been loaded</strong> to 
							produce a "heavy scale ticket." These scale tickets are provided only at certified, 
                            calibrated scales, which means <strong>the difference between the heavy and light 
                            weights provides the exact weight of the freight</strong>.
                        </li>
                        <li style="padding-bottom:4px">
							Typically this services is requested when shipping bulk recyclable materials such as scrap metal or bulk food products 
							like grains. The driver is responsible for obtaining the scale tickets. Once the driver has scaled light and heavy, 
							the driver, or their dispatcher, will send the scale tickets along with any other delivery paperwork and their invoice. 
							Once we have received all of that documentation, we send the scale tickets to our customer.
						</li>
                    </ul>
                </div>`
        }
    },
    {
        svg: EyeSVG,
        title: 'Blind Shipment',
        description: 'When the pickup and destination locations are kept confidential from each other',
        value: 'Blind Shipment',
        helpbox: {
            description: 'When the pickup and destination locations are kept confidential from each other.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							This service keeps the <strong>identity and address of the pickup and receiving locations hidden</strong> from each 
							other. It's also known as double-blind or drop shipping.
						</li>
                        <li style="padding-bottom:4px">
							Typically this service is requested when the party arranging the shipping is a middleman
							between a manufacturer and a customer. It helps the arranger <strong>keep all parties and pricing confidential</strong>.
						</li>
                        <li style="padding-bottom:4px">
							For more details on how this works, <strong>give us a call to discuss quote options</strong>.
						</li>
                    </ul>
                </div>`
        }
    },
    {
        svg: FloorLoadedSVG,
        title: 'Floor Loaded Items',
        description: 'When freight is unpalletized and loaded directly onto the trucks floor',
        value: 'Floor Loaded Items',
        helpbox: {
            description: "When freight is unpalletized and loaded directly onto the truck's floor.",
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							Floor loading is a great option for freight that is <strong>durable and not easily damaged, 
							but awkward to palletize</strong>. Tires are a great example of a sturdy product which can easily be banded together 
							in stacks and then safely floor loaded onto a trailer.
						</li>
                        <li style="padding-bottom:4px">
							Floor loading is not something all carriers offer, so it can sometimes take a little extra time to match a carrier to your 
							shipment. Whenever possible, <strong>book your floor load shipments several days ahead of your requested pickup 
							date</strong> to help ensure timely pickup.
						</li>
                        <li style="padding-bottom:4px">
							It usually takes longer to floor load a trailer, so keep in mind carriers still only allow <strong>2 hours to load 
							your freight, and 2 hours to unload it</strong>.
						</li>
                    </ul>
                </div>`
        }
    }, 
	{
        svg: DriverAssistSVG,
        title: 'Driver Assist',
        description: 'When a location needs help from the driver to load or unload freight',
        value: 'Driver Assist',
        helpbox: {
            description: 'When a location needs help from the driver to load or unload the freight.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							<strong>Drivers are not required to assist with loading or unloading</strong> freight <strong>unless this service is 
							requested</strong> and negotiated ahead of time.
						</li>
                        <li style="padding-bottom:4px">
							Since <strong>drivers need to know details</strong> about the assistance being requested and any special equipment 
							they may need to bring, <strong>give us a call to discuss quote options</strong>, and our team will help you determine 
							exactly what you'll need.
						</li>
                    </ul>
                </div>`
        }
    },	
	{
        svg: LocationResidentialSVG,
        title: 'Residential Pickup',
        description: 'A non-residential location that may be difficult for a truck to access i.e. church, strip mall, school, etc.',
        value: 'Residential Pickup',
        helpbox: {
            description: 'When the location is a residential address or area.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							Includes homes and home businesses.
						</li>
                        <li style="padding-bottom:4px">
							Freight carriers use large trucks that are difficult to maneuver in residential areas. It can be done, but additional 
							fees will apply.
						</li>
						<li style="padding-bottom:4px">
							Because residential locations rarely have a loading dock, you’ll want to add lift gate service so the driver can 
							lower down/lift up your shipment to/from the ground.
						</li>
						<li style="padding-bottom:4px">
							Also consider adding inside delivery/pickup service if the freight needs to be moved to/from a porch, driveway, 
							or garage.
						</li>
						<li style="padding-bottom:4px">
							Cost varies between each carrier. You can see a breakdown of prices when you reach the quote screen.
						</li>
                    </ul>
                </div>`
        }
    },
    {
        svg: LocationResidentialSVG,
        title: 'Residential Delivery',
        description: 'A non-residential location that may be difficult for a truck to access i.e. church, strip mall, school, etc.',
        value: 'Residential Delivery',
        helpbox: {
            description: 'When the location is a residential address or area.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							Includes homes and home businesses.
						</li>
                        <li style="padding-bottom:4px">
							Freight carriers use large trucks that are difficult to maneuver in residential areas. It can be done, but additional 
							fees will apply.
						</li>
						<li style="padding-bottom:4px">
							Because residential locations rarely have a loading dock, you’ll want to add lift gate service so the driver can 
							lower down/lift up your shipment to/from the ground.
						</li>
						<li style="padding-bottom:4px">
							Also consider adding inside delivery/pickup service if the freight needs to be moved to/from a porch, driveway, 
							or garage.
						</li>
						<li style="padding-bottom:4px">
							Cost varies between each carrier. You can see a breakdown of prices when you reach the quote screen.
						</li>
                    </ul>
                </div>`
        }
    },	
	{
        svg: LiftGateSVG,
        title: 'Liftgate',
        description: "When the location doesn't have a loading dock and your shipment is too heavy to lift without assistance",
        value: 'Liftgate',
        helpbox: {
            description: 'When the location doesn’t have a loading dock and your shipment is too heavy to lift without assistance.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							When shipping freight, carriers use trucks that are typically designed to unload at a loading dock. A lift gate 
							will lower your shipment from the trailer to the ground.
						</li>
                        <li style="padding-bottom:4px">
							Lift gate service is commonly used for residential locations and commercial locations without a loading dock.
						</li>
						<li style="padding-bottom:4px">
							Cost varies between each carrier. You can see a breakdown of prices when you reach the quote screen.
						</li>
                    </ul>
                </div>`
        }
    },	
	{
        svg: DollarSignSVG,
        title: 'Shipment is Worth More than $100,000',
        description: 'When all items in your shipment combine to a total worth over $100,000',
        value: 'Shipment is Worth More than $100,000',
        helpbox: {
            description: 'Shipments valued over $100,000',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							We partner with specially vetted carriers to move shipments valued over $100,000. <strong>Contact us</strong> for more details and possible quote options.
						</li>
                    </ul>
                </div>`
        }
    },
    {
        svg: AppointmentFeeSVG,
        title: 'Pickup/Delivery Appointment',
        description: 'When the carrier is required to contact final delivery location for specific appointment window',
        value: 'Pickup/Delivery Appointment',
        helpbox: {
            description: 'The carrier will contact the pickup/delivery location to make an appointment for pickup/delivery.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							Use this service when you’d like the carrier to schedule the delivery window on the day of delivery. This will 
							typically be a call from the carrier’s dispatcher.
						</li>
                    </ul>
                </div>`
        }
    },
    {
        svg: PalletJackSVG,
        title: 'Pallet Jack at Pickup',
        description: "Used for moving pallets within the facility when a forklift is not available or practical.",
        value: 'Pallet Jack at Pickup',
        helpbox: {
            description: 'Used for moving pallets within the facility when a forklift is not available or practical.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
                            A pallet jack is a manual or powered device used to lift and move pallets over short distances.
                        </li>
                        <li style="padding-bottom:4px">
                            Ideal for environments where a forklift cannot be used, such as in tight spaces or where low-weight pallets need to be moved.
                        </li>
                        <li style="padding-bottom:4px">
                            Cost and availability of pallet jacks may vary by carrier and location.
                        </li>
                        <li style="padding-bottom:4px">
                            Typically used in warehouses, retail locations, and certain commercial settings.
                        </li>
                    </ul>
                </div>`
        }
    },
    {
        svg: PalletJackSVG,
        title: 'Pallet Jack at Delivery',
        description: "Used for moving pallets within the facility when a forklift is not available or practical.",
        value: 'Pallet Jack at Delivery',
        helpbox: {
            description: 'Used for moving pallets within the facility when a forklift is not available or practical.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
                            A pallet jack is a manual or powered device used to lift and move pallets over short distances.
                        </li>
                        <li style="padding-bottom:4px">
                            Ideal for environments where a forklift cannot be used, such as in tight spaces or where low-weight pallets need to be moved.
                        </li>
                        <li style="padding-bottom:4px">
                            Cost and availability of pallet jacks may vary by carrier and location.
                        </li>
                        <li style="padding-bottom:4px">
                            Typically used in warehouses, retail locations, and certain commercial settings.
                        </li>
                    </ul>
                </div>`
        }
    },    
]
