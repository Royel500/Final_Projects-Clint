import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import rider from '../../public/agent-pending.png';
import pending from '../../public/agent-pending.png';// Add a pending image
import Swal from "sweetalert2";
import useAxiosecure from "../hooks/useAxiosecure";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";

const Rider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosecure();
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || ''
    }
  });

  // Check if user has already applied
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/riders/check?email=${user.email}`)
        .then(res => {
          if (res.data.exists) {
            setHasApplied(true);
            setApplicationStatus(res.data.status); // 'pending', 'approved', or 'rejected'
          }
        })
        .catch(err => console.error('Error checking application:', err));
    }
  }, [user, axiosSecure]);

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    
    axiosSecure.post('/riders', riderData)
      .then(res => { 
        if(res.data.insertedId) {
          setHasApplied(true);
          setApplicationStatus('pending');
          Swal.fire({
            icon: 'success',
            title: 'Application Submitted!',
            text: 'Thank you for registering as a rider. We will contact you soon.',
            confirmButtonColor: '#84cc16',
          });
        }
      });
  };

  // Backend API endpoint needed (add this to your server)
  /*
  app.get('/riders/check', async (req, res) => {
    const email = req.query.email;
    const rider = await riderCollection.findOne({ email });
    res.json({ 
      exists: !!rider,
      status: rider?.status || ''
    });
  });
  */

  if (hasApplied) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8 text-center">
          <img src={pending} alt="Pending Approval" className="mx-auto w-64 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {applicationStatus === 'pending' ? 'Application Pending' : 
             applicationStatus === 'approved' ? 'Application Approved!' : 'Application Status'}
          </h2>
          
          <div className="space-y-4 mb-6">
            {applicationStatus === 'pending' && (
              <>
                <p className="text-gray-600">
                  Your rider application is under review. We'll notify you once it's processed.
                </p>
                <div className="badge badge-warning p-4">Status: Pending </div>
              </>
            )}
            
            {applicationStatus === 'active' && (
              <>
                <p className="text-gray-600 mx-3">
                  Congratulations! Your rider application has been approved.
                </p>
                <div className="flex gap-3 justify-center items-center">
              <div className="badge badge-success  py-5 mt-2 ">Status: Approved</div>
              <Link to={'/dasboard/manageProfile'}>
          <button className="btn btn-primary mt-4">
                  Go to Rider Dashboard
                </button>
              </Link>  
                </div>
              
              </>
            )}
            
            {applicationStatus === 'rejected' && (
              <>
                <p className="text-gray-600">
                  We're sorry, your application wasn't approved this time.
                </p>
                <div className="badge badge-error p-4">Status: Not Approved</div>
                <p className="text-sm text-gray-500 mt-2">
                  You may contact support for more information.
                </p>
              </>
            )}
          </div>
          
          <div className="divider">OR</div>
          <button 
            className="btn btn-ghost text-blue-600"
            onClick={() => setHasApplied(false)}
          >
            View Application Details
          </button>
        </div>
      </div>
    );
  }

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
            <div className="grid grid-cols-1  gap-4">
            

             <select
                {...register("region", { required: true })}
                className="select select-bordered w-full"
              >
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