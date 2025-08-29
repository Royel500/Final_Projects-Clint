import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosecure from '../hooks/useAxiosecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';


// https://final10-mauve.vercel.app
// http://https://assignment-12-server-indol-ten.vercel.app


const MyPercel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosecure();
  const queryClient = useQueryClient();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [] } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sendPercel?email=${user?.email}`);
      return res.data;
    },
  });

  // ----- View Parcel -----
  const handleView = async (id) => {
    try {
      const { data } = await axiosSecure.get(`/sendPercel/${id}`);
      setSelectedParcel(data);
      setIsViewModalOpen(true);
    } catch (error) {
      Swal.fire('Error', 'Failed to load parcel details.', 'error');
    }
  };

  // ----- Payment -----
  const handlePay = (id) => {
    navigate(`/dasboard/payment/${id}`);
  };

  // ----- Delete -----
  const handleDelete = async (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This parcel will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/sendPercel/${_id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Parcel has been deleted.', 'success');
            queryClient.invalidateQueries(['my-parcels']);
          }
        } catch (err) {
          Swal.fire('Error!', 'Failed to delete parcel.', 'error');
        }
      }
    });
  };




  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Parcels</h2>
   <table className="table table-zebra w-full">
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Type</th>
      <th>Weight</th>
      <th>Cost</th>
      <th>Delivery_Status</th>
      <th>Delivery_Boy</th>
      <th>Payment</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {parcels && parcels.length > 0 ? (
      parcels.map((parcel, index) => (
        <tr key={parcel._id}>
          <td>{index + 1}</td>
          <td>{parcel.title}</td>
          <td>
            <span
              className={`badge ${
                parcel.parcelType === 'document'
                  ? 'badge-info'
                  : 'badge-warning'
              }`}
            >
              {parcel.parcelType}
            </span>
          </td>
          <td>{parcel.weight}kg</td>
          <td>৳{parcel.deliveryCost}</td>
          <td>{parcel.delivery_status}</td>
          <td>{parcel.delivery_Boy}</td>
          <td>
            <span
              className={`badge ${
                parcel.payment_status === 'paid'
                  ? 'badge-success'
                  : 'badge-error'
              }`}
            >
              {parcel.payment_status}
            </span>
          </td>
          <td>
            <div className="flex gap-1">
              <button
                onClick={() => handleView(parcel._id)}
                className="btn btn-xs btn-outline btn-info"
              >
                View
              </button>

              <button
                onClick={() => handlePay(parcel._id)}
                className="btn btn-xs btn-outline btn-warning"
              >
                Pay
              </button>

              <button
                onClick={() => handleDelete(parcel._id)}
                className="btn btn-xs btn-outline btn-error"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={9} className="text-center text-lg py-4">
          No parcels sent yet.
        </td>
      </tr>
    )}
  </tbody>
</table>


      {/* View Parcel Modal */}
      {isViewModalOpen && selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => setIsViewModalOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4">Parcel Details</h2>
            <p>
              <strong>Title:</strong> {selectedParcel.title}
            </p>
            <p>
              <strong>Type:</strong> {selectedParcel.parcelType}
            </p>
            <p>
              <strong>Weight:</strong> {selectedParcel.weight}kg
            </p>
            <p>
              <strong>Cost:</strong> ৳{selectedParcel.deliveryCost}
            </p>

        {selectedParcel.receiverContact ? (
            <p>
              <strong>Receiver Contact:</strong> {selectedParcel.receiverContact}
            </p>
          ) : (
            <p>
              <strong>Sender Contact:</strong> {selectedParcel.senderContact}
            </p>
          )}

          

            <p>
              <strong>Status:</strong> {selectedParcel.delivery_status}
            </p>
            <p>
              <strong>Delivery Boy:</strong> {selectedParcel.delivery_Boy}
            </p>
            <p>
              <strong>Delivery Boy contact:</strong> {selectedParcel.delivery_boy_email}
            </p>
            <p>
              <strong>Payment:</strong> {selectedParcel.payment_status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPercel;
