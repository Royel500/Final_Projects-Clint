import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosecure from '../hooks/useAxiosecure';

const CheckOutFrom = () => {
const stripe = useStripe();
const elements = useElements();
const [error ,setError] =useState('');
const { parcelId } =useParams();
const axiosSecure = useAxiosecure();

const {isPending ,data:parcelInfo=[]} = useQuery({
    queryKey:['parcels', parcelId],
    queryFn:async() =>{
        const res = await axiosSecure.get(`/sendPercel/${parcelId}`);
        return res.data;
       
    }
});

console.log(parcelInfo);
const price = parcelInfo.deliveryCost;

if(isPending){
    return <span className="loading loading-dots loading-xl"></span>;
}


    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if(!card){
            return;
        }
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:'card' ,
            card
        })

        if(error){
          setError(error.message)
        }
        else{
            setError('')
            console.log('payment method' , paymentMethod)
        }
    }

    return (
        <div className='my-20'>
            <form onSubmit={handleSubmit} className="max-w-md  mx-auto
             bg-white p-6 rounded shadow">
       <CardElement  className="mb-4 border p-2" >

       </CardElement>

               <button disabled={!stripe} type='submit' 
         className="bg-blue-500 w-full text-white px-4 py-2 rounded">
            Pay ${price}
        </button>
        {
            error && <p className='text-red-600'>{error}</p>
        }
            </form>
        </div>
    );
};

export default CheckOutFrom;