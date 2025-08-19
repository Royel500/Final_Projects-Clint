import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosecure from '../hooks/useAxiosecure';
import useAuth from '../hooks/useAuth';

const PendingRiders = () => {
  const axiosSecure = useAxiosecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // ✅ Get pending riders using react-query
  const { data: riders = [], isLoading } = useQuery({
  queryKey: ['pending-riders', user?.email], // include email in cache key
    queryFn: async () => {
      const res = await axiosSecure.get('/pending');
      return res.data;
    },
  });

  // ✅ Accept mutation
  const acceptMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/riders/approve/${id}`, { status: 'active' }),
    onSuccess: () => {
      Swal.fire('Approved!', 'Rider has been accepted.', 'success');
      queryClient.invalidateQueries(['pending-riders']);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to approve rider.', 'error');
    },
  });

// ✅ Reject mutation
const rejectMutation = useMutation({
  mutationFn: (id) => axiosSecure.patch(`/riders/reject/${id}`),
  onSuccess: (data) => {
    if (data.data?.success) {
      Swal.fire('Rejected!', 'Rider has been marked as rejected.', 'success');
      queryClient.invalidateQueries(['pending-riders']);
    } else {
      Swal.fire('Error', data.data?.message || 'Failed to reject rider.', 'error');
    }
  },
  onError: () => {
    Swal.fire('Error', 'Server error occurred while rejecting rider.', 'error');
  },
});

const handleCancel = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You are about to reject this rider.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, reject it!',
  }).then((result) => {
    if (result.isConfirmed) {
      rejectMutation.mutate(id);
    }
  });
};

    const handleAccept = (id) => {
    acceptMutation.mutate(id);
  };



  if (isLoading) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
      <table className="table w-full table-zebra">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Bike Registration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id}>
              <td>{index + 1}</td>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td className="text-red-700 italic font-bold">{rider.status}</td>
              <td>{rider.bikeRegistration}</td>
              <td className="space-x-2">
                <Link to={`/dasboard/rider/${rider._id}`} className="btn btn-info btn-sm">
                  Details
                </Link>
                <button
                  onClick={() => handleAccept(rider._id)}
                  className="btn btn-success btn-sm"
                  disabled={acceptMutation.isLoading}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleCancel(rider._id)}
                  className="btn btn-error btn-sm"
                  disabled={rejectMutation.isLoading}
                >
                  Reject
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

export default PendingRiders;
