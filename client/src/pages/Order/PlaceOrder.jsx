import { useLocation } from 'react-router-dom';

export default function PlaceOrder() {
    
    const location = useLocation();
    const formData = location.state;
    
    return(
        <div>
            <h2>{formData}</h2>
        </div>
    );
}