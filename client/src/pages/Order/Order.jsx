import Landing from "../../components/landing";
import PlaceOrderForm from "./PlaceOrderForm";

export default function Order() {
    return(
        <div className="bg-bg pb-24">
            <Landing title='Place Order'/>
            <div className="flex justify-center pt-24">
                <PlaceOrderForm />
            </div>
        </div>
    );
}