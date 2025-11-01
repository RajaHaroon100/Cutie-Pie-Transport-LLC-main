import Landing from "../../components/landing"
import AboutUs from "../Content/AboutUs"
import AboutCompany from "../Content/AboutCompany"
import AboutServices from "../Content/AboutServices"
import Values from "./Values"
import AboutCEO from "./AboutCEO"
import Testimonial from "../Content/Testimonial"

export default function aboutUs() {
    return (
        <div className="bg-bg pb-12">
            <Landing title="About Us" />
            <AboutCEO />
            <AboutUs />
            <Values />
            <AboutServices />
            <AboutCompany />
            <Testimonial />
        </div>
    );
}
