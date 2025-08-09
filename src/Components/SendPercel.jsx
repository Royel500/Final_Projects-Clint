import React, {  } from 'react';
import { useForm } from 'react-hook-form';
import  { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import useAxiosecure from '../hooks/useAxiosecure';
import Swal from 'sweetalert2';
import useAuth from './../hooks/useAuth';

const SendPercel = ({ currentUser }) => {
  const { register, handleSubmit, watch,  reset, formState: { errors } } = useForm();
  // const [deliveryCost, setDeliveryCost] = useState(null);
  // const [pendingData, setPendingData] = useState(null);
  
  const {user} =useAuth();

  const axiosSecure =useAxiosecure();
const parcelType = watch('parcelType');
const weight = watch('weight');


  const calculateCost = (data) => {
    let base = data.parcelType === 'document' ? 50 : 100;
    let weightCost = data.parcelType === 'non-document' && data.weight ? parseInt(data.weight) * 10 : 0;
    return base + weightCost;
  };

//   ---cost ------

const getLiveCost = () => {
  if (!parcelType) return 0;
  let base = parcelType === 'document' ? 50 : 100;
  let weightCost = parcelType === 'non-document' && weight ? parseInt(weight) * 10 : 0;
  return base + weightCost;
};




const onSubmit = async (data) => {
  const cost = calculateCost(data);

  const result = await Swal.fire({
    title: `Estimated Delivery Cost: ৳${cost}`,
    text: "Do you want to confirm and place this parcel?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#16a34a",
  });

  if (result.isConfirmed) {
    const finalData = {
      ...data,
      creation_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      deliveryCost: cost,
      payment_status:'unpaid',
     delivery_status:'transit',
    CreateBy: user?.email, 

    };

    try {
     axiosSecure.post('/sendPercel',finalData)
     .then(res =>{
         if (res.data.insertedId) {
        Swal.fire("Success!", "Parcel added successfully.", "success");
        reset();
      } else {
        Swal.fire("Error", "Failed to save parcel. Please try again.", "error");
      }
     })

     
    } catch (error) {
      console.error("Save error:", error);
      Swal.fire("Error", error.response?.data?.message || "Server error", "error");
    }
  }
};



  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow rounded-xl space-y-6">
     
      <h1 className="text-3xl font-bold">Add Parcel</h1>
      <p className="text-gray-600">Please fill in the details below to request a delivery.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold">Parcel Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div>
              <label className="label">Parcel Type</label>
              <select className="select select-bordered w-full" {...register("parcelType", { required: true })}>
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.parcelType && <span className="text-red-500 text-sm">Type is required</span>}
            </div>

            <div>
              <label className="label">Title</label>
              <input type="text" className="input input-bordered w-full" {...register("title", { required: true })} />
              {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
            </div>


    {/* Weight */}
    <div>
  <label className="label">Weight (kg)</label>
  <input
    type="number"
    min="0"
    className="input input-bordered w-full"
    {...register("weight")}
    disabled={parcelType === 'document'}
    placeholder={parcelType === 'document' ? 'N/A for document' : 'Enter weight'}
  />
  
  {/* Show cost only if parcelType is selected */}
  {parcelType && (
    <p className="text-sm text-green-600 mt-1">
      Estimated Cost: ৳ <span className="font-semibold">{getLiveCost()}</span>
    </p>
  )}
</div>
</div>


        </fieldset>

        {/* Sender Info */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold">Sender Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
<div>
  <label className="label">Name</label>
  <input
  type="text"
  className="input input-bordered w-full"
  defaultValue={user?.displayName || ''}
  {...register("senderName")}
  readOnly
/>

  {errors.senderName && <span className="text-red-500 text-sm">Required</span>}
</div>

            <div>
              <label className="label">Contact</label>
              <input type="text" className="input input-bordered w-full" {...register("senderContact", { required: true })} />
              {errors.senderContact && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Region</label>
              <select className="select select-bordered w-full" {...register("senderRegion", { required: true })}>
                <option value="">Select Region</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="khulna">Khulna</option>
                <option value="sylhet">Sylhet</option>
                <option value="barisal">Barisal</option>
                <option value="rangpur">Rangpur</option>
                <option value="mymensingh">Mymensingh</option>
              </select>
              {errors.senderRegion && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Service Center</label>
              <select className="select select-bordered w-full" {...register("senderService", { required: true })}>
                <option value="">Select Center</option>
                <option value="Uttara">Uttara</option>
                <option value="Mirpur">Mirpur</option>
              </select>
              {errors.senderService && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div className="md:col-span-2">
              <label className="label">Address</label>
              <input type="text" className="input input-bordered w-full" {...register("senderAddress", { required: true })} />
              {errors.senderAddress && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div className="md:col-span-3">
              <label className="label">Pickup Instruction</label>
              <input type="text" className="input input-bordered w-full" {...register("pickupInstruction", { required: true })} />
              {errors.pickupInstruction && <span className="text-red-500 text-sm">Required</span>}
            </div>
          </div>
        </fieldset>

        {/* Receiver Info */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-semibold">Receiver Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div>
              <label className="label">Name</label>
              <input type="text" className="input input-bordered w-full" {...register("receiverName", { required: true })} />
              {errors.receiverName && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Contact</label>
              <input type="text" className="input input-bordered w-full" {...register("receiverContact", { required: true })} />
              {errors.receiverContact && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">District</label>
              <select className="select select-bordered w-full" {...register("receiverRegion", { required: true })}>
                <option value="">Select Region</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="khulna">Khulna</option>
                <option value="sylhet">Sylhet</option>
                <option value="barisal">Barisal</option>
                <option value="rangpur">Rangpur</option>
                <option value="mymensingh">Mymensingh</option>
              </select>
              {errors.receiverRegion && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Service Center</label>
              <select className="select select-bordered w-full" {...register("receiverService", { required: true })}>
                <option value="">Select Center</option>
                <option value="Banani">Banani</option>
                <option value="Motijheel">Motijheel</option>
              </select>
              {errors.receiverService && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div className="md:col-span-2">
              <label className="label">Address</label>
              <input type="text" className="input input-bordered w-full" {...register("receiverAddress", { required: true })} />
              {errors.receiverAddress && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div className="md:col-span-3">
              <label className="label">Delivery Instruction</label>
              <input type="text" className="input input-bordered w-full" {...register("deliveryInstruction", { required: true })} />
              {errors.deliveryInstruction && <span className="text-red-500 text-sm">Required</span>}
            </div>
          </div>
        </fieldset>

        <div className="text-right">
          <button className="btn btn-primary">Submit Parcel</button>
        </div>
      </form>
    </div>
  );
};

export default SendPercel;


