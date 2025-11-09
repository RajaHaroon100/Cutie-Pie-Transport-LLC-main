import dropTrailerSvg from '../../assets/SVGs/drop-trailer.svg'
import handshakeSvg from '../../assets/SVGs/handshake-brokerage.svg'
import partialsSvg from '../../assets/SVGs/partials.svg'
import canadaImg from '../../assets/SVGs/canada.svg' 
import FTLimg from '../../assets/SVGs/FTL.svg'
import LTLimg from '../../assets/SVGs/LTL.svg'
import drayageImg from '../../assets/SVGs/drayage.svg'
import CareShipmentSVG from '../../assets/SVGs/care-shipment.svg'
import PortRailSVG from '../../assets/SVGs/port-rail.svg'

export const SERVICES = [
    {
      image: dropTrailerSvg,
      title: 'Drop Trailer',
      description:
        'Customers turn to us daily to navigate their complex supply chains. Our drop trailer experts can evaluate your pain points and offer solutions to create greater efficiency via a drop trailer program.',
    },
    {
      image: partialsSvg,
      title: 'Partials',
      description:
        'When you can’t fill a trailer or have shipments that don’t fit the requirements of traditional LTL, our dedicated team of experts consolidates your freight into one multi-stop trailer or box truck.',
    },
    // {
    //   image: handshakeSvg,
    //   title: 'Customs Brokerage',
    //   description:
    //     'As a certified member of the Customs Trade Partnership Against Terrorism (CTPAT) program meaning you can rest easy that we will follow the most secure guidelines set forth by the Customs and Border Protection (CBP) to prevent disruptions in the supply chain.',
    // },
    {
      image: CareShipmentSVG,
      title: 'High Value Shipments',
      description:
        'Specializing in high-value shipments, we ensure secure transport, real-time tracking, and advanced logistics. From pickup to delivery, trust us to protect your valuable assets with precision and care. Trust us to safeguard what matters most.',
    },
    // {
    //   image: canadaImg,
    //   title: 'Canada Services',
    //   description:
    //     'Our dedicated team of logistics experts, backed by Cutie Pie Transport’s Customs Brokerage Services, are with you every step of the way, handling the intricacies of both intra-Canada shipments and cross-border shipments to ensure safe and prompt delivery.',
    // },
    {
      image: PortRailSVG,
      title: 'Port & Rail Services',
      description:
        'Experience efficient and reliable port and rail services for both bulk and containerized goods. Enjoy smooth transitions, faster transit times, and secure deliveries with real-time tracking. Keep your shipments moving and your business running smoothly.',
    },
  ];

  export const MODES = [
    {
      image: FTLimg,
      link: '/FTLQuote',
      title: 'Full Truckload (FTL)',
      description:
        'If you move full truckload freight, aligning yourself with a reputable and experienced logistics partner can give you a competitive advantage.',
    },
    {
      image: LTLimg,
      link: '/LTLQuote',
      title: 'Less Than Truckload (LTL)',
      description:
        'When it comes to shipping your product through less than truckload services, you want qualified LTL expertise. More importantly, you want tailored logistics solutions that eliminate concerns and uncertainty.',
    },
    // {
    //   image: drayageImg,
    //   link: '/DrayageQuote',
    //   title: 'Drayage',
    //   description:
    //     'Cutie Pie Tranport’s dedicated team of drayage experts have the experience and network to find capacity for your cargo - even in challenging market conditions.',
    // },
  ];

  export const TESTIMONIALS = [
    {
      name: 'Mark Z.',
      heading: 'Exceptional Service',
      comment: 'Cutie Pie Transport, LLC has been a game-changer for our logistics. Their freight hauling service is top-notch and incredibly efficient!',
      stars: 5,
    },
    {
      name: 'Emily R.',
      heading: 'Always Available',
      comment: 'The team at Cutie Pie Transport, LLC is always available and supportive. They handle all our freight hauling needs seamlessly.',
      stars: 5,
    },
    {
      name: 'Michael S.',
      heading: 'Significant Cost Savings',
      comment: 'We have seen significant cost savings since switching to Cutie Pie Transport, LLC. Their route optimization is excellent.',
      stars: 4,
    },
    {
      name: 'Sarah T.',
      heading: 'Exceptional Customer Service',
      comment: 'Cutie Pie Transport, LLC offers exceptional customer service. They take care of everything, allowing us to focus on our business.',
      stars: 5,
    },
    {
      name: 'David K.',
      heading: 'Outstanding Support',
      comment: 'Their real-time tracking and driver support are outstanding. Cutie Pie Transport, LLC has made our operations much smoother.',
      stars: 5,
    },
    {
      name: 'Lisa M.',
      heading: 'Flexible Plans',
      comment: 'We love the flexibility of their plans. Cutie Pie Transport, LLC even customized a plan to fit our specific needs perfectly.',
      stars: 5,
    },
    {
      name: 'Brian P.',
      heading: 'Best Decision',
      comment: 'Switching to Cutie Pie Transport, LLC was the best decision we made. Their services are reliable, and our drivers appreciate the support.',
      stars: 4,
    },
  ];
  
