import FTLQuoteForm from "./FTLQuoteForm";
import Landing from "../../../components/landing";

export default function FTLQuote() {
    return(
        <div className="bg-bg pb-24">
            <Landing title="Full Truckload Quote"/>
            <div className="flex justify-center pt-24">
                <FTLQuoteForm />
            </div>
            
        </div>
    )
}