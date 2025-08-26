import React, { useState } from 'react';
import ContactSection from '../Pages/Home/Services/Contact/ContactSection';

const tabs = [
  { label: "Story", content: `We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.` },
  { label: "Mission", content: `Our mission is to simplify logistics and elevate delivery experiences through technology, trust, and timely service. We aim to empower businesses and individuals alike with reliable courier support.` },
  { label: "Success", content: `With thousands of successful deliveries each week and growing partnerships nationwide, our success is measured by the trust our customers place in us. Our consistent service record and real-time tracking capabilities have set us apart.` },
  { label: "Team & Others", content: `Behind our success is a passionate team committed to service excellence. From delivery agents to tech engineers, everyone plays a role in ensuring seamless logistics.` },
];

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section>


  
    <div className="max-w-4xl mx-auto bg-base-300 px-5 py-5 
    rounded-xl shadow-lg my-5">
      <h2 className="text-3xl font-semibold text-gray-800 mb-1">About Us</h2>
      <p className="text-sm text-gray-500 mb-6">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
      </p>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-2 text-sm font-semibold ${
              activeTab === index
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-green-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="text-gray-600 text-sm space-y-4">
        <p>{tabs[activeTab].content}</p>
        <p>{tabs[activeTab].content}</p>
        <p>{tabs[activeTab].content}</p>
      </div>
    </div> 
              <ContactSection/>
      </section>
  );
};

export default AboutUs;
