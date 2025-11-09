import Card from './Card.jsx'

import { SERVICES } from './data.js'

export default function Services() {
    return(
        <div className='font-sans pt-8' data-aos="fade-up">
            <div className='text-center'>
                <h1 className='text-3xl md:text-4xl font-bold text-heading_2 mt-2 md:mt-4 mb-6'>Our Services</h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-24 lg:px-36' data-aos="fade-up">
                {SERVICES.map((service, itr) => (<Card key={itr} mapper="services" {...service}/>))}
            </div>
        </div>
    );
}
