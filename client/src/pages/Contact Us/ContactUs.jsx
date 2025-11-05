import Landing from "../../components/landing"
import ContactInfo from "./ContactInfo"
import BookLoad from "./BookLoad"
import Message from "./ContactForm"
import MapLocation from "../Content/MapLocation"

export default function ContactUs() {
    return (
        <div className="bg-bg pb-24">
            <Landing title="Contact Us"/>
            <ContactInfo />
            <BookLoad />
            <Message />
            <MapLocation />
        </div>
    );
}
