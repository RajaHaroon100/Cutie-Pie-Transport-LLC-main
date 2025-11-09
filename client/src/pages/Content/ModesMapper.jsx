import Card from './Card.jsx';
import { MODES } from './data.js';

export default function Modes() {
    return (
        <div className='font-sans pb-8' data-aos="fade-up">
            <div className='text-center'>
                <h1 className='text-3xl md:text-4xl font-bold text-heading_2 mt-16 md:mt-24 mb-6'>
                    Our Modes
                </h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-24 lg:px-36' data-aos="fade-up">
                {MODES.map((service, itr) => (
                    <Card key={itr} mapper="modes" {...service} />
                ))}
            </div>
        </div>
    );
}

