import React, { useState } from 'react';

const PricingCalculator = () => {
  const [cost, setCost] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Example logic: set a flat cost if parcelType and destination selected
    if (data.parcelType && data.destination) {
      setCost(50);
    }

    console.log("Form Submitted Data:");
    console.log(data); // { parcelType: "small", destination: "dhaka", email: "abc@email.com" }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Pricing Calculator</h2>
      <p className="text-sm text-gray-500 mb-6">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
      </p>

      <hr className="mb-6" />

      <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Calculate Your Cost</h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Parcel Type */}
          <div>
            <label className="label font-medium text-gray-700">Parcel Type</label>
            <select name="parcelType" className="select select-bordered w-full" required>
              <option value="">Select Parcel type</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Delivery Destination */}
          <div>
            <label className="label font-medium text-gray-700">Delivery Destination</label>
            <select name="destination" className="select select-bordered w-full" required>
              <option value="">Select Delivery Destination</option>
              <option value="dhaka">Dhaka</option>
              <option value="chittagong">Chittagong</option>
              <option value="sylhet">Sylhet</option>
              <option value="khulna">Khulna</option>
            </select>
          </div>

          {/* Email */}
          <div className="md:col-span-1">
            <label className="label font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-1 flex items-end">
            <button
              type="submit"
              className="btn w-full bg-lime-300 hover:bg-lime-400 text-white font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      </form>

      {/* Cost Display */}
      {cost !== null && (
        <div className="text-5xl font-bold text-black text-center mt-6">
          {cost} Tk
        </div>
      )}
    </div>
  );
};

export default PricingCalculator;
