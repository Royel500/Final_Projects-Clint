import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosecure from '../hooks/useAxiosecure';
import Swal from 'sweetalert2';
import AssignRiderModal from './AssignRiderModal';

const AssignRider = () => {
  const axiosSecure = useAxiosecure();
  const [selectedParcel, setSelectedParcel] = useState(null); // ✅ For modal trigger

  const { data: paidParcels = [], isLoading, error, refetch } = useQuery({
    queryKey: ['paid-parcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels/paid');
      return res.data;
    }
  });

  const openAssignModal = (parcel) => {
    setSelectedParcel(parcel);
    document.getElementById('assign_rider_modal').showModal(); // ✅ Open modal
  };

  const closeModal = () => {
    setSelectedParcel(null);
    document.getElementById('assign_rider_modal').close();
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching data.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Paid Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th className="w-40">Parcel ID</th>
              <th>Sender</th>
              <th>Sender Contact</th>
              <th>Receiver Contact</th>
              <th>Receiver Address</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
      <tbody>
  {paidParcels.map((parcel, index) => (
    <tr key={parcel._id}>
      <td>{index + 1}</td>
      <td className="w-20 truncate">{parcel._id}</td>
      <td className="w-20 truncate">{parcel.CreateBy}</td>
      <td>{parcel.senderContact || 'N/A'}</td>
      <td>{parcel.receiverContact || 'N/A'}</td>
      <td>{parcel.receiverAddress || 'N/A'}</td>
      <td className="text-green-600 font-semibold">{parcel.payment_status}</td>
      <td>
        {parcel.assignedRider ? (
          <button className="btn btn-sm btn-success" disabled>
            Already Assigned
          </button>
        ) : (
          <button
            onClick={() => openAssignModal(parcel)}
            className="btn btn-sm btn-primary"
          >
            Assign Rider
          </button>
        )}
      </td>
    </tr>
  ))}
  {paidParcels.length === 0 && (
    <tr>
      <td colSpan="8" className="text-center text-gray-500">
        No paid parcels found.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      {/* ✅ Modal Component Call */}
      {selectedParcel && (
        <AssignRiderModal
          parcel={selectedParcel}
          onClose={closeModal}
          refetchParcels={refetch}
        />
      )}
    </div>
  );
};

export default AssignRider;