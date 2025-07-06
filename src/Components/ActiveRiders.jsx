import React, { useEffect, useState } from 'react';
import useAxiosecure from '../hooks/useAxiosecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const ActiveRiders = () => {
  const axiosSecure = useAxiosecure();
  const { user } = useAuth();
  
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    axiosSecure.get('/active')
      .then(res => setRiders(res.data))
      .catch(err => console.error('Error fetching pending riders:', err));
  }, [axiosSecure]);





   const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',  // red color
      cancelButtonColor: '#3085d6', // blue color
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep rider'
    });
  
    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/riders/delete/${id}`);
        Swal.fire('Cancelled!', 'Rider has been rejected.', 'info');
        setRiders(prev => prev.filter(r => r._id !== id));
      } catch (error) {
        Swal.fire('Error', 'Failed to cancel rider.', 'error');
      }
    }
  };




  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>
      <table className="table w-full table-zebra">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registration</th>
            <th>Bike Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id}>
            <td>{index + 1}</td>
            <td>{rider.name}</td>
            <td>{rider.email}</td>
            <td>{rider.bikeRegistration}</td>
            <td>{rider.bikeBrand}</td>
            <td className='text-red-700 italic font-bold'>
              {rider.status}
            </td>
            <td>
              <button
                onClick={() => handleCancel(rider._id)}
                className="btn btn-error btn-sm"
              >
                Rejecte
              </button>
            </td>
          </tr>

          ))}
          {riders.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-6">
                No pending riders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveRiders;
