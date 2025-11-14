import StandardLTLSVG from '../../../assets/SVGs/standard-ltl.svg'
import SmallParcelSVG from '../../../assets/SVGs/small-parcel.svg'
import BusinessSVG from '../../../assets/SVGs/business.svg'
import ResidentialSVG from '../../../assets/SVGs/residential.svg'
import TerminalSVG from '../../../assets/SVGs/carrier-terminal.svg'
import LocationSVG from '../../../assets/SVGs/inside-location.svg'
import LiftGateSVG from '../../../assets/SVGs/lift-gate.svg'
import ResidentialPickSVG from '../../../assets/SVGs/residential-pickup.svg'
import AppointmentFeeSVG from '../../../assets/SVGs/appointment-fee.svg'
import FreightClassSVG from '../../../assets/SVGs/freight-class-box.svg'
import PalletJackSVG from '../../../assets/SVGs/pallet-jack.svg'

export const EQUIPMENT_TYPE = [
    {
        svg: StandardLTLSVG,
        title: 'Standard LTL',
        description: 'The most common LTL service.',
        value: 'Standard LTL',
        helpbox: {
            description: "Less than truckload (LTL) is used for small freight or when freight doesn't require the use of an entire trailer.",
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							Our LTL carriers are fully <strong>licensed, insured, and bonded</strong>
						</li>
                        <li style="padding-bottom:4px">
							LTL operates on a <strong>hub and spoke model</strong> where freight is combined at a warehouse for shipment to 
							another warehouse and the process repeats until the final destination
						</li>
                        <li style="padding-bottom:4px">
							Ideal for shipments under <strong>15,000 pounds</strong>
						</li>
                        <li style="padding-bottom:4px">
							Able to accommodate <strong>bulky</strong> or <strong>uniquely-shaped freight</strong>
						</li>
                        <li style="padding-bottom:4px">
							<strong>Packaging freight properly</strong> will reduce the risk of damage
						</li>
                    </ul>
                </div>`
        }
    }, {
        svg: SmallParcelSVG,
        title: 'Small Parcel',
        description: 'Quotes for booking with a small parcel carrier.',
        value: 'Small Parcel',
        helpbox: {
            description: "Parcel shipping involves packages that are below 150 pounds and can be lifted without assistance.",
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							These shipments are <strong>not sent on pallets</strong> and often move through a small package shipping system
						</li>
                        <li style="padding-bottom:4px">
							<strong>Potential cost advantage</strong> comes from parcel shipments moving at a higher volume
						</li>
                        <li style="padding-bottom:4px">
							<strong>Proper packaging</strong> is important because multiple transfers between trucks are likely
						</li>
                        <li style="padding-bottom:4px">
							Multiple services are available between <strong>ground</strong> and <strong>overnight</strong>
						</li>
                    </ul>
                </div>`
        }
    },
]

export const ADDITIONAL_SERVICES = [
	
	{
        svg: LiftGateSVG,
        title: 'Lift Gate at Pickup',
        description: "When the location doesn't have a loading dock and your shipment is too heavy to lift without assistance",
        value: 'Lift Gate at Pickup',
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
        svg: LiftGateSVG,
        title: 'Lift Gate at Delivery',
        description: "When the location doesn't have a loading dock and your shipment is too heavy to lift without assistance",
        value: 'Lift Gate at Delivery',
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
        svg: LocationSVG,
        title: 'Pick up inside the location',
        description: 'When the driver needs to move the shipment from somewhere other than directly behind the truck',
        value: 'Pick up inside the location',
        helpbox: {
            description: 'When the driver needs to move the shipment from somewhere other than directly behind the truck.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							Generally, with this service, the driver will only pick up from inside the threshold of the pickup location.
						</li>
                        <li style="padding-bottom:4px">
							For a residential address, inside pickup involves the carrier moving the shipment from the driveway, porch, or garage. 
							Drivers will not pick up inside a home.
						</li>
						<li style="padding-bottom:4px">
							For a commercial address, the driver will pick up the shipment a few feet inside the main entrance or similar location.
						</li>
						<li style="padding-bottom:4px">
							Inside pickup is not needed if the driver will be using a loading dock or if you can place your shipment near the 
							driver’s loading location.
						</li>
						<li style="padding-bottom:4px">
							Cost varies between each carrier. You can see a breakdown of prices when you reach the quote screen.
						</li>
                    </ul>
                </div>`
        }
    },
	{
        svg: ResidentialPickSVG,
        title: 'Residential Pickup',
        description: 'When the location is a residential address or area.',
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
        svg: LocationSVG,
        title: 'Delivery inside the location',
        description: 'When the driver needs to move the shipment from somewhere other than directly behind the truck',
        value: 'Delivery inside the location',
        helpbox: {
            description: 'When the driver needs to move the shipment from somewhere other than directly behind the truck.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							With inside delivery, the driver will generally only deliver inside the threshold of the pickup location.
						</li>
                        <li style="padding-bottom:4px">
							For a residential address, inside delivery involves the carrier moving the shipment to the driveway, porch, or garage. 
							Drivers will not deliver inside a home.
						</li>
						<li style="padding-bottom:4px">
							For a commercial address, the driver will deliver the shipment a few feet inside the main entrance or similar location.
						</li>
						<li style="padding-bottom:4px">
							Inside delivery is not needed if the driver will be using a loading dock or you intend to move the shipment yourself 
							after the driver unloads it from the trailer.
						</li>
						<li style="padding-bottom:4px">
							Cost varies between each carrier. You can see a breakdown of prices when you reach the quote screen.
						</li>
                    </ul>
                </div>`
        }
    },
    {
        svg: ResidentialPickSVG,
        title: 'Residential Delivery',
        description: 'When the location is a residential address or area.',
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
        svg: AppointmentFeeSVG,
        title: 'Pickup Appointment',
        description: 'When the carrier is required to contact pickup location for specific appointment window',
        value: 'Pickup Appointment',
        helpbox: {
            description: 'The carrier will contact the pickup location to make an appointment for pickup.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							Use this service when you’d like the carrier to schedule the pickup window on the day of pickup. This will 
							typically be a call from the carrier’s dispatcher.
						</li>
                        <li style="padding-bottom:4px">
							This service is only applicable to LTL quotes. If you select this service and then choose a truckload quote, there will
							not be an additional fee.
						</li>
                    </ul>
                </div>`
        }
    },
    {
        svg: AppointmentFeeSVG,
        title: 'Delivery Appointment',
        description: 'When the carrier is required to contact final delivery location for specific appointment window',
        value: 'Delivery Appointment',
        helpbox: {
            description: 'The carrier will contact the delivery location to make an appointment for delivery.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
							Use this service when you’d like the carrier to schedule the delivery window on the day of delivery. This will 
							typically be a call from the carrier’s dispatcher.
						</li>
                        <li style="padding-bottom:4px">
							This service is only applicable to LTL quotes. If you select this service and then choose a truckload quote, there will
							not be an additional fee.
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

export const LOCATION_TYPE = [
    {
        svg: BusinessSVG,
        title: 'Business',
        description: 'Commercial buildings and areas',
        value: 'Business',
        additional_services: {
            pickup: ['Lift Gate at Pickup', 'Pick up inside the location', 'Pickup Appointment', 'Pallet Jack at Pickup'],
            delivery: ['Lift Gate at Delivery', 'Delivery inside the location', 'Delivery Appointment', 'Pallet Jack at Delivery'],
        },
        helpbox: {
            description: 'A commercial building or area that may or may not have a loading dock.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
                            A home business would be considered a residential location
                        </li>
                        <li style="padding-bottom:4px">
							If the location doesn’t have a loading dock, you may need to consider adding a lift gate service later in the quote so 
							the driver can lower down/lift up your shipment to/from the ground.
						</li>
						<li style="padding-bottom:4px">
							Make sure you choose the correct location type to receive the most accurate quote.
						</li>
                    </ul>
                </div>`
        }
    },  
	{
        svg: ResidentialSVG,
        title: 'Residential',
        description: 'Home and home businesses',
        value: 'Residential',
        additional_services: {
            pickup: ['Lift Gate at Pickup', 'Pick up inside the location', 'Residential Pickup', 'Pickup Appointment', 'Pallet Jack at Pickup'],
            delivery: ['Lift Gate at Delivery', 'Delivery inside the location', 'Residential Delivery', 'Delivery Appointment', 'Pallet Jack at Delivery'],
        },
        helpbox: {
            description: 'A home or home business in a residential area and typically doesn’t have a loading dock.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
                            Not all carrier equipment is allowed down residential roads or areas so it is important to choose the correct location 
							type for an accurate quote.
                        </li>
                        <li style="padding-bottom:4px">
							Because residential locations rarely have a loading dock, you’ll want to add lift gate service later in the quote so the 
							driver can lower down/lift up your shipment to/from the ground.
						</li>
						<li style="padding-bottom:4px">
							Also consider adding inside delivery/pickup service if the freight needs to be moved to/from a porch, driveway, or 
							garage.
						</li>
                    </ul>
                </div>`
        }
    },	
	{
        svg: TerminalSVG,
        title: 'Carrier Terminal',
        description: 'Save money and skip the pickup services',
        value: 'Carrier Terminal',
        additional_services: {
            pickup: [],
            delivery: [],
        },
        helpbox: {
            description: 'Take your packaged items directly to a nearby carrier terminal and your shipment will continue transit from there.',
            instructions: 
                `<div style="font-size:16px; text-align:justify">
                    <ul style="list-style-type:disc; padding-left:16px">
                        <li style="padding-bottom:4px">
                            Carrier Terminal potentially saves you time and money because you won’t need any carrier pickup services.
                        </li>
                        <li style="padding-bottom:4px">
							Your items must be securely packaged and ready for transit before drop off. 	
						</li>
						<li style="padding-bottom:4px">
							When you book with this option, we’ll send you all the contact information and instructions to work directly with the 
							carrier.
						</li>
                    </ul>
                </div>`
        }
    },
]

export const FREIGHT_CLASS = {
    svg: FreightClassSVG,
    title: "Freight Class",
    helpbox:{
        description: "U.S. less than truckload (LTL) carriers use freight classes to categorize LTL freight. Freight classes are defined by the National Motor Freight Traffic Association (NMFTA).",
        instructions: 
            `
                <div style="font-size:16px; text-align:justify">
                        <div style="list-style-type:disc; padding-left:16px;">
                            <div style="padding-bottom:6px">
                                <h3 style="font-weight: bold">Why it's important</h3>
                                Freight classes help ensure you receive a fair price from carriers and may establish 
                                the applicable limit of liability in the case of loss or damage.
                            </div>
                            <div style="padding-bottom:6px">
                                <h3 style="font-weight: bold">How it's calculated</h3>
                                Freight classes are calculated based on four characteristics: density, handling, stowability and liability. 	
                            </div>
                            <div style="padding-top:8px; font-weight: 500; text-align: left;">
                                If you don't know yours, no worries. We can use the information you already shared to provide an 
                                estimated class.
                            </div>
                        </div>
                    </div>
            `
    }
}
