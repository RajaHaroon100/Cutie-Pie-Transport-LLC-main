import '../../App.css'

export default function ContactCard({image, contactType, contactInfo}) {
    return (
        <div className="animated-card bg-[#fbcfd3] border-b-8 border-primary mx-8 md:mx-0 p-8 rounded-lg shadow-md font-sans">
            <span>
                <img className="max-w-16 md:max-w-24 object-cover rounded-t-lg mx-auto" src={image} alt="contact-svg" />
                <h3 className="text-base md:text-lg font-semibold text-subHeading_1 mt-2 md:mt-4">{contactType}</h3>
                <h1 className="text-lg md:text-2xl font-bold text-heading_1 mt-0 md:mt-2">{contactInfo}</h1>
            </span>
        </div>
    );
}