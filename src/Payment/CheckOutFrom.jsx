import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosecure from '../hooks/useAxiosecure';
import useAuth from '../hooks/useAuth'; // Assuming you have this
import Swal from 'sweetalert2';

const CheckOutFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosecure();
  const { user } = useAuth(); // get current user info
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sendPercel/${parcelId}`);
      return res.data;
    }
  });

  const price = parcelInfo.deliveryCost || 0;
  const amountInCents = Math.round(price * 100);

  if (isPending) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  if (!parcelInfo || !parcelInfo._id) {
    return <div className="text-center text-red-500">Parcel not found.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setLoading(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const res = await axiosSecure.post('/create-payment-intent', {
        amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'Anonymous',
            email: user?.email
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        await axiosSecure.post('/payments', {
          parcelId,
          userEmail: user.email,
          amount: price,
          transactionId: result.paymentIntent.id,
          status: 'succeeded',
          date: new Date(),
        });

        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: `Transaction ID: ${result.paymentIntent.id}`,
        });
      }
    } catch (err) {
      console.error('Unhandled error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='my-20 max-w-xl mx-auto'>
      {parcelInfo.payment_status === 'paid' ? (
        <div className="text-green-600 text-center text-lg font-semibold">
          ✅ This parcel has already been paid for.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Pay ${price} for Parcel</h2>
          <CardElement className="mb-4 border p-2 rounded" />
          <button
            disabled={!stripe || price === 0 || loading}
            type='submit'
            className="bg-blue-600 hover:bg-blue-700 text-white w-full px-4 py-2 rounded"
          >
            {loading ? "Processing..." : `Pay $${price}`}
          </button>
          {error && <p className='text-red-600 mt-2'>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default CheckOutFrom;
