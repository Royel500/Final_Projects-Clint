'use client'
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosecure from '../../../hooks/useAxiosecure';
import Swal from 'sweetalert2';

const ReviewContainer = () => {
  const axiosSecure = useAxiosecure();
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const review = form.review.value;
    const number = form.number.value || null;

    const reviewData = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      review,
      number,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post('/reviews', reviewData);

      if (res.data.insertedId) {
        // ✅ Success Alert
        Swal.fire({
          title: 'Success!',
          text: 'Your review has been submitted.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // ✅ Voice Feedback
        const speech = new SpeechSynthesisUtterance("Thank you for your review");
        window.speechSynthesis.speak(speech);

        form.reset();
      }
    } catch (err) {
      console.error("Error saving review:", err);

      // ❌ Error Alert
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit review. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
         <input
          type="number"
          name="number"
          placeholder="Your number (optional)"
          className="w-full border p-2 rounded"
        />
        
        <textarea
          name="review"
          placeholder="Write your review..."
          required
          className="w-full border p-2 rounded"
        ></textarea>

       

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewContainer;
