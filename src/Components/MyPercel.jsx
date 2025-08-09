import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosecure from '../hooks/useAxiosecure';
import {
  useQuery,
  QueryClient,
  useQueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';


const MyPercel = () => {
    const {user} =useAuth();
const navigate = useNavigate();

    const axiosSecure = useAxiosecure();
      const queryClient = useQueryClient();

   const {data:parcels=[]} = useQuery({
    queryKey:['my-parcels' , user.email],
    queryFn:async () =>{
const res = await axiosSecure.get(`/sendPercel?email=${user?.email}`,);
// const res = await axiosSecure.get(`/payments?email=${user?.email}`);
        return res.data;
        
    }
   });


  //  -----View---------
   const handleView =(id)=>{

   }
// __Payment------
   const handlePay = (id) =>{
  navigate(`/dasboard/payment/${id}`)
   }
// ----DELETE------
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
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels?.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td>{parcel.title}</td>
              <td>
                <span className={`badge ${parcel.parcelType === 'document' ? 'badge-info' : 'badge-warning'}`}>
                  {parcel.parcelType}
                </span>
              </td>
              <td>{parcel.weight}kg</td>
            
              <td>৳{parcel.deliveryCost}</td>
              <td>{parcel.delivery_status}</td>
              <td>
                <span className={`badge ${parcel.payment_status === 'paid' ? 'badge-success' : 'badge-error'}`}>
                  {parcel.payment_status}
                </span>
              </td>
                       <td>
                <div className="flex gap-1">
                  <button
                   onClick={() =>handleView(parcel._id)}
                   className="btn btn-xs btn-outline btn-info">View</button>

                  <button 
                  onClick={() =>handlePay(parcel._id)}
                   className="btn btn-xs btn-outline btn-warning">Pay</button>
                   
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-outline btn-error"
                  >
                    Delete
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default MyPercel;