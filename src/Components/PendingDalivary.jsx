import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosecure from '../hooks/useAxiosecure';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const PendingDelivery = () => {
  const axiosSecure = useAxiosecure();
  const { user } = useAuth();

  const { data: pendingParcels = [], isLoading, error, refetch } = useQuery({
    queryKey: ['pending-deliveries', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/rider/pending?email=${user.email}`);
      return res.data.data;
    },
  });

  const handlePickup = async (parcelId) => {
    try {
      const res = await axiosSecure.patch(`/parcels/mark-delivered/${parcelId}`);
      if (res.data.success) {
        Swal.fire('✅ Delivered', 'Parcel marked as delivered.', 'success');
        refetch();
      } else {
        Swal.fire('❌ Error', res.data.message || 'Failed to update.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('❌ Error', 'Server error occurred.', 'error');
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading pending deliveries...</div>;
  if (error) return <div className="text-red-500 text-center">Failed to load deliveries.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📦 Pending Deliveries</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Parcel Title</th>
              <th>Receiver</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingParcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.title}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverContact}</td>
                <td>{parcel.receiverAddress}</td>
                <td>
                  <span className="badge badge-warning text-white">
                    {parcel.delivery_status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    disabled={parcel.delivery_status === 'delivered'}
                    onClick={() => handlePickup(parcel._id)}
                  >
                    {parcel.delivery_status === 'delivered' ? 'Delivered' : 'Pickup & Deliver'}
                  </button>
                </td>
              </tr>
            ))}
            {pendingParcels.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500">
                  No pending deliveries.or All completely delivered
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingDelivery;
