import ModesMapper from '../Content/ModesMapper'
import ServicesMapper from '../Content/ServicesMapper';
import Landing from '../../components/landing'
import Advantages from '../Content/Advantages';

export default function Services() {
    return (
        <div className='bg-bg pb-4'>
            <Landing title='Services' />
            <ModesMapper />
            <ServicesMapper />
            <div className='pt-24'>
                <Advantages />
            </div>
        </div>
    );
}