'use client'
import React, { useEffect, useState } from 'react';
import useAxiosecure from '../../../hooks/useAxiosecure';
import Marquee from 'react-fast-marquee';

const Reviews = () => {
  const axiosSecure = useAxiosecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get('/reviews');
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchReviews();
  }, [axiosSecure]);

  return (
    <div className="w-full bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        What Our Users Say
      </h2>

      <Marquee speed={50} pauseOnHover={true} gradient={false} className="space-x-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="w-72 h-35 bg-white shadow-md rounded-xl mx-2 p-4 flex-shrink-0"
          >
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={rev.image}
                alt={rev.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <h3 className="text-lg font-semibold">{rev.name}</h3>
            </div>
            <p className="text-gray-700 italic">"{rev.review}"</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Reviews;
