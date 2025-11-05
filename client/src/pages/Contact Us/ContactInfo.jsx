import ContactCard from './ContactCard';
import { CONTACTS } from './ContactData';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function ContactInfo() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className='pb-8 pt-20' data-aos="fade-up">
            <div className='px-4 md:px-8 lg:px-36'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
                    {CONTACTS.map((contact, itr) => (
                        <ContactCard key={itr} {...contact} />
                    ))}
                </div>
            </div>
        </div>
    );
}

