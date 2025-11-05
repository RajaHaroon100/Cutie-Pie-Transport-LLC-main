import React from 'react';

const AccessorialPolicyText = () => {
    return (
        <div className="p-6 bg-bg rounded-lg shadow-sm my-4 font-sans">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Accessorial Policy</h1>
            <p className="mb-6 text-gray-700">
                At Cutie Pie Transport LLC, we believe that the best way to avoid confusion is to agree on all potential terms at the onset of any agreement.
            </p>
            <p className="mb-6 text-gray-700">
                For this reason, we never engage without an agreement which includes an accessorial policy. This policy is binding with the specific rate contract received regardless of whether any other policies are signed or previously agreed upon. This policy contract shall supersede any other policies, written or verbal, unless agreed upon in advance in writing by both parties.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-900">DETENTION</h2>
            <p className="mb-6 text-gray-700">
                The first 120 minutes (2 Hours) are a more than reasonable expected amount of loading time after which $65 per hour will be charged to be billed in 15 minute increments. This shall be true and start at 120 minutes or 30 minutes after notification that detention charges are approaching.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-900">LAYOVER</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Scheduled Layover:</strong> $250.00. Any layover that is pre-scheduled in writing before a drop off or pickup date. (due to issues from the Shipper, Receiver or outside scheduling errors).</li>
                <li><strong>High Traffic Scheduled Layover:</strong> $550.00. As a committed carrier, we often meet personnel for overnight & non business hours, early loading appointments or are required to load or unload in heavily trafficked areas. This is a scheduled layover.</li>
                <li><strong>Unscheduled Layover:</strong> $875.00. In the event that, through no cause of our own, a delivery is delayed over night, a reasonable layover fee is expected. Our other loads are dependent upon your or your customers’ adherence to their scheduled appointment times. (The rate is only negotiable based on circumstances). Your customer “won’t pay you or they will only pay a specific amount” is not a negotiable circumstance. We will automatically file a claim and pursue legal steps with our in-house attorneys if there is any issue with payment that is unresolved within 72 hours.</li>
                <li><strong>Over Weight Layover:</strong> $1000.00 Example: The rate confirmation says it is a 40,000lb load. We inform that we will haul 40,000. We scale the load and discover that we are over 80,000lbs and the shipper is now closed for the day. This will likely result in a layover and as such, the layover will need to be included in an updated rate confirmation immediate or payable immediately via a Certified Check, Wire Transfer, Comcheck or Zelle payment. The line haul must include the layover and not be separated. We will scale any load with a ratecon or BOL showing 30,000 and up.</li>
            </ul>

            <p className="mb-6 text-gray-700">
                This written notification is a legal binding agreement in the affirmative in the event that the ratecon cannot be updated after hours.
            </p>

            <p className="mb-6 text-gray-700">
                All CAT scale weight fees are the responsibility of the customer or broker & shall be invoiced at the load completion or before if the load is prepaid.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-900">STOP OFF</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Scheduled Stop-off:</strong> $130. (This represents 2 hours at our detention rate.) When 2 hours is exceeded, the normal detention rate of $65 per hour applies.</li>
                <li><strong>Unscheduled Stop-off:</strong> $200 each, plus additional mileage. These occur when our truck arrives at one location, freight is removed and we are asked to take the freight to a second or third location.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-900">TONU (Truck Order Not Used)</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>$200 base plus additional applicable fees. If we have not arrived but have driven more than 10 miles toward the pickup, the expectation is $3.00 per mile for all miles driven. If we wait over night to pickup the next morning (before 8am) and the load cancels, our expected tonu fee will be $600. If we wait for an afternoon load that cancels and we are unable to recover, the expected tonu will be $750.</li>
                <li><strong>Deceptive TONU:</strong> $700 plus additional applicable accessorials. Deceptive TONU occurs when we are sent to pick up freight that we have stated that we do not haul like Alcoholic beverages, loose grains, recyclables, trash, etc. The trailer is Food Grade and must remain useable for food grade freight items.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-900">SATELLITE TRACKING</h2>
            <p className="mb-6 text-gray-700">
                We offer tracking on your shipments via our provider, Trucking Office. You may also use MacroPoint or Trucker Tools. All tracking is charged at $100. For an upfront fee of $1250, a LIVE tracking is available. (Includes the ability to see the freight inside the trailer while enroute & view the truck & its surroundings as it is enroute via an online secure password protected web based portal).
            </p>
        </div>
    );
};

export default AccessorialPolicyText;

