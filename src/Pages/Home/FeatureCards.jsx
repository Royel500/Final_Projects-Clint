import React from "react";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    image: "../../../public/live-tracking.png", // replace with your image path
  },
  {
    title: "Secure Packaging",
    description:
      "We use durable and tamper-proof materials to ensure your parcels are well-protected throughout transit — from fragile items to important documents.",
    image: "../../../public/safe-delivery.png",
  },
  {
    title: "Customer Support",
    description:
      "Need help? Our support team is available 24/7 to assist with your delivery questions, issues, or special requests — just a call or chat away.",
    image: "../../../public/image-upload-icon.png",
  },
];

const FeatureCards = () => {
  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center p-6 gap-6"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full md:w-1/3 max-h-56 object-contain"
            />
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
