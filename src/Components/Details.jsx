import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosecure from '../hooks/useAxiosecure';
import { Link } from 'react-router-dom';

const RiderDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosecure();
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/riders/${id}`)
      .then(res => {
        setRider(res.data);
        console.log(res.data);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure, id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!rider) return <div className="text-center mt-10 text-red-500">Rider not found.</div>;

  return (
    <div className="max-w-3xl my-10 mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-green-600 text-center">Rider Details</h2>
      <div className='flex justify-around'>

     
      <div>
          <p><strong>Name:</strong> {rider.name}</p>
      <p><strong>Email:</strong> {rider.email}</p>
      <p><strong>Phone:</strong> {rider.phone}</p>
      <p><strong>Age:</strong> {rider.age}</p>
      <p><strong>NID:</strong> {rider.nid}</p>
      </div>
      <div>
              <p><strong>Region:</strong> {rider.region}</p>
      <p><strong>District:</strong> {rider.district}</p>
      <p><strong>Bike Brand:</strong> {rider.bikeBrand}</p>
      <p><strong>Bike Registration:</strong> {rider.bikeRegistration}</p>
      <p><strong>Status:</strong> 
        <span className={`ml-2 font-semibold ${rider.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
          {rider.status}
        </span>
      </p>
      </div>

       </div>
    
      <h1 className='text-center my-2'>
      {rider.note && <p><strong>Note:</strong> {rider.note}</p>}

      </h1>
  <div className='flex justify-end'>
      <button className='btn btn-primary'>
        
        <Link className='mx-5'  to='/dasboard/pendingRider'>Back</Link>
      </button>
  </div>


    </div>
  );
};

export default RiderDetails;
