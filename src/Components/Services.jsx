// Services.jsx
import React from 'react';
import useAuth from '../hooks/useAuth';

const Services = () => {
    const {user} = useAuth();
  return (
    <div className="max-w-6xl mx-auto px-4 font-sans text-gray-800">
      {/* Header Component */}
      <header className="flex justify-between items-center py-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">ParcelExpress</h1>
        <nav className="flex items-center space-x-8">
          <a href="/" className="font-medium text-gray-800 hover:text-blue-600">Home</a>
          <div className="text-gray-500">{user?.email || 'admin@gmail.com'}</div>
        </nav>
      </header>

      {/* Hero Banner Component */}
      <section className="bg-gray-50 py-16 my-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto leading-tight">
          We Make Sure Your Parcel Arrives On Time – No Pass.
        </h2>
      </section>

      {/* Booking Form Component */}
      <section className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto my-10">
        <h3 className="text-2xl font-bold text-center mb-8">Our Services</h3>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium">Your name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Name" 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className="block font-medium">Date</label>
            <input 
              type="date" 
              id="date" 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="time" className="block font-medium">Time</label>
            <input 
              type="time" 
              id="time" 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
          >
            Schedule Delivery
          </button>
        </form>
      </section>

      {/* Features Component */}
      <section className="flex flex-wrap justify-center gap-6 py-10 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
          <h4 className="text-xl font-bold mb-4">Fastest Delivery & Easy Pickup</h4>
          <p className="text-gray-600">
            Our streamlined process ensures your packages are handled with maximum efficiency.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
          <h4 className="text-xl font-bold mb-4">Delivery in 30 Minutes at your doorstep</h4>
          <p className="text-gray-600">
            Urgent local deliveries handled by our dedicated courier team.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Services;