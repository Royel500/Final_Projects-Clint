import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosecure from '../hooks/useAxiosecure';

const AssignRiderModal = ({ parcel, onClose, refetchParcels }) => {
  const axiosSecure = useAxiosecure();

const { data: riders = [], isLoading } = useQuery({
  queryKey: ['riders-by-region', parcel?.senderRegion],
  enabled: !!parcel?.senderRegion,
  queryFn: async () => {
    const res = await axiosSecure.get(`/riders/by-region?region=${parcel.senderRegion}`);
    return res.data; // should be an array already
  },
});

  // ✅ Assign selected rider to the parcel
const handleAssign = async (rider) => {
  if (
    parcel.senderRegion?.toLowerCase() !== rider.district?.toLowerCase()
  ) {
    alert('Sender region and rider district do not match!');
    return;
  }

  try {
    const res = await axiosSecure.patch('/assignRider', {
      parcelId: parcel._id,
      riderId: rider._id,
      riderName:rider.name,
      riderEmail:rider.email,
    });

    if (res.data.success) {
      alert('✅ Rider Assigned & Parcel marked as "transit"');
      onClose();
      refetchParcels?.();
    } else {
      alert('❌ Failed to assign rider');
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <dialog id="assignRiderModal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          Assign Rider for: {parcel.receiverName}
        </h3>

      {isLoading ? (
  <p>Loading riders...</p>
) : riders.length === 0 ? (
  <p>No available riders in <strong>{parcel?.senderRegion}</strong></p>
) : (
  <div className="overflow-x-auto">
    <table className="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>District</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {riders.map((rider) => (
          <tr key={rider._id}>
            <td>{rider.name}</td>
            <td>{rider.phone}</td>
            <td>{rider.district}</td>
            <td>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleAssign(rider)}
              >
                Assign
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        <div className="modal-action">
      
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AssignRiderModal;
