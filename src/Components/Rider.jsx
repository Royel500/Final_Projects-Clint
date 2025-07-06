import React from "react";
import { useForm } from "react-hook-form";
import rider from '../../public/agent-pending.png';
import useAxiosecure from "../hooks/useAxiosecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosecure();
  const {user} =useAuth();



  const onSubmit = (data) => {
   const riderData = {
    ...data,
    // name:user?.displayName || '',
    // email:user?.email || '',
    status: 'pending',
    created_at:new Date().toISOString(),
   }
   console.log(riderData)
   axiosSecure.post('/riders' , riderData)
   .then(res =>{
    if(res.data.insertedId){
        Swal.fire({
    icon: 'success',
    title: 'Application Submitted!',
    text: 'Thank you for registering as a rider. We will contact you soon.',
    confirmButtonColor: '#84cc16', // lime-500
  });
    }
   })

  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full p-8 flex flex-col md:flex-row gap-8">
        {/* Left: Form */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-green-800">Be a Rider</h2>
          <p className="text-gray-600">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
              />
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
              />
            </div>

            {/* Age, Phone, NID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                {...register("age", { required: true })}
                type="number"
                placeholder="Age"
                className="input input-bordered w-full"
              />
              <input
                {...register("phone", { required: true })}
                type="text"
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />
              <input
                {...register("nid", { required: true })}
                type="text"
                placeholder="NID Number"
                className="input input-bordered w-full"
              />
            </div>

            {/* Region and District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                {...register("region", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </select>

              <select
                {...register("district", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select District</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="khulna">Khulna</option>
                <option value="sylhet">Sylhet</option>
                <option value="barisal">Barisal</option>
                <option value="rangpur">Rangpur</option>
                <option value="mymensingh">Mymensingh</option>
              </select>
            </div>

            {/* Bike Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                {...register("bikeBrand", { required: true })}
                type="text"
                placeholder="Bike Brand"
                className="input input-bordered w-full"
              />
              <input
                {...register("bikeRegistration", { required: true })}
                type="text"
                placeholder="Bike Registration No."
                className="input input-bordered w-full"
              />
            </div>

            {/* Note */}
            <textarea
              {...register("note")}
              placeholder="Additional Notes (optional)"
              className="textarea textarea-bordered w-full"
              rows={3}
            ></textarea>

            <button
              type="submit"
              className="btn bg-lime-400 hover:bg-lime-500 w-full text-white font-semibold"
            >
              Continue
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={rider}
            alt="Rider"
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Rider;
