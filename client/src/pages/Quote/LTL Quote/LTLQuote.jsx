import LTLQuoteForm from "./LTLQuoteForm";
import Landing from "../../../components/landing";

export default function FTLQuote() {
    return(
        <div className="bg-bg pb-24">
            <Landing title="Less Than Truckload Quote"/>
            <div className="flex justify-center pt-24">
                <LTLQuoteForm />
            </div>
        </div>
    )
}