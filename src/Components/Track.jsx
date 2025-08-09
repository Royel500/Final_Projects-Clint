import React, { useState, useEffect } from 'react';
import { FiSearch, FiPackage, FiUser, FiPhone, FiMapPin, FiClock, FiTruck } from 'react-icons/fi';
import { FaCheckCircle, FaShippingFast } from 'react-icons/fa';
import useAxiosecure from '../hooks/useAxiosecure';

const Track = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const axiosSecure = useAxiosecure();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            setError('Please enter a contact number');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const response = await axiosSecure.get(`/parcels/search?contact=${searchTerm}`);
            setParcels(response.data);
            if (response.data.length === 0) {
                setError('No parcels found with this contact number');
            }
        } catch (err) {
            setError('Failed to search parcels');
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'delivered': return <FaCheckCircle className="text-green-500" />;
            case 'transit': return <FaShippingFast className="text-blue-500" />;
            default: return <FiPackage className="text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'transit': return 'bg-blue-100 text-blue-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Track Your Parcel</h1>
                    <p className="mt-2 text-gray-600">
                        Search by sender or receiver contact number
                    </p>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Enter sender/receiver contact number"
                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </form>
                    {error && <p className="mt-2 text-red-500">{error}</p>}
                </div>

                {/* Search Results */}
                {parcels.length > 0 && (
                    <div className="space-y-6">
                        {parcels.map((parcel) => (
                            <div key={parcel._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                {/* Parcel Header */}
                                <div className="bg-blue-600 px-6 py-4 text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {getStatusIcon(parcel.delivery_status)}
                                            <h2 className="text-xl font-semibold">
                                                {parcel.title} ({parcel.parcelType})
                                            </h2>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(parcel.delivery_status)}`}>
                                            {parcel.delivery_status}
                                        </span>
                                    </div>
                                </div>

                                {/* Parcel Details */}
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Sender Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                            <FiUser className="mr-2" /> Sender Details
                                        </h3>
                                        <div>
                                            <p className="font-medium">Contact</p>
                                            <p className="text-gray-600">{parcel.senderContact}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Region</p>
                                            <p className="text-gray-600">{parcel.senderRegion}, {parcel.senderService}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Address</p>
                                            <p className="text-gray-600">{parcel.senderAddress}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Pickup Instructions</p>
                                            <p className="text-gray-600">{parcel.pickupInstruction}</p>
                                        </div>
                                    </div>

                                    {/* Receiver Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                            <FiUser className="mr-2" /> Receiver Details
                                        </h3>
                                        <div>
                                            <p className="font-medium">Name</p>
                                            <p className="text-gray-600">{parcel.receiverName}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Contact</p>
                                            <p className="text-gray-600">{parcel.receiverContact}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Region</p>
                                            <p className="text-gray-600">{parcel.receiverRegion}, {parcel.receiverService}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Address</p>
                                            <p className="text-gray-600">{parcel.receiverAddress}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Delivery Instructions</p>
                                            <p className="text-gray-600">{parcel.deliveryInstruction}</p>
                                        </div>
                                    </div>

                                    {/* Parcel Metadata */}
                                    <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                                        <div>
                                            <p className="font-medium">Weight</p>
                                            <p className="text-gray-600">{parcel.weight} kg</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Delivery Cost</p>
                                            <p className="text-gray-600">৳{parcel.deliveryCost}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Payment Status</p>
                                            <p className={`font-medium ${
                                                parcel.payment_status === 'paid' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {parcel.payment_status}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Created On</p>
                                            <p className="text-gray-600">{parcel.creation_date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Track;