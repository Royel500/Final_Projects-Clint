import React from "react";
import photo from '../../../public/location-merchant.png'

const MegaCard = () => {
  return (
    <div className=" lg:mx-10 rounded-2xl  px-8 py-10 md:flex items-center justify-between shadow-lg overflow-hidden">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
          Merchant and Customer Satisfaction <br />
          is Our First Priority
        </h2>
        <p className="text-sm  max-w-md">
          We offer the lowest delivery charges with the highest value along with 100% safety of your product. Profast courier delivers your parcels in every corner of Bangladesh right on time.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
       <button className="border  
           font-semibold px-5 py-2 rounded-full  hover:text-black transition">
            Become a Merchant
          </button>

          <button className="border  
           font-semibold px-5 py-2 rounded-full  hover:text-black transition">
            Earn with Profast Courier
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
          src={photo}
          alt="Parcel Graphic"
          className="max-h-60"
        />
      </div>
    </div>
  );
};

export default MegaCard;
