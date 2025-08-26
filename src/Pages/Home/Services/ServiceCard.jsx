import React from 'react';

const cardData = [
  {
    title: "Express & Standard Delivery",
    description: "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
    details: "Delivery in 24–72 hours in major cities. Express in 4–6 hours within Dhaka.",
    icon: "📦",
  },
  {
    title: "Same Day Delivery",
    description: "Need something delivered urgently? We’ve got you covered. Ideal for documents, gifts, and essential items.",
    details: "Same-day delivery available within city limits before 4 PM.",
    icon: "🚚",
  },
  {
    title: "Bulk Shipment Solutions",
    description: "Efficient delivery for business customers with high-volume shipments. From e-commerce to wholesale — we handle it all.",
    details: "Affordable rates with scheduled pickups and custom tracking.",
    icon: "📦",
  },
  {
    title: "Nationwide Coverage",
    description: "No matter where you are in Bangladesh, we’ll reach you. Expanding our network every month for better service.",
    details: "Serving 60+ districts across the country.",
    icon: "🌍",
  },
  {
    title: "Secure & Insured Delivery",
    description: "Your parcel’s safety is our priority. We ensure careful handling with optional insurance coverage.",
    details: "Coverage for valuable and sensitive packages.",
    icon: "🔒",
  },
  {
    title: "Real-Time Tracking & Support",
    description: "Stay updated with every step of your parcel’s journey. Get instant alerts and talk to live support any time.",
    details: "Track parcels via app, SMS, or web dashboard.",
    icon: "📱",
  },
];

const ServiceCards = () => {
  return (
    <div className=" py-10 px-4"> 
    <div className='text-center my-5'>
        <h1 className='text-3xl font-bold'>
            Our Services
        </h1>
        <p>
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
             From personal packages to <br /> business shipments — we deliver on time, every time.
        </p>
    </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className="bg-gray-400 rounded-xl transition-all  p-6
             text-center  duration-1000 hover:bg-gray-500 shadow-xl"
          >
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{card.description}</p>
            <p className="text-gray-800 font-medium text-sm">{card.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;
