import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth'; // your custom auth context
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import GoogleLogIn from './GoogleLogIn';
import axios from 'axios';
import useAxios from '../../hooks/useAxios'; // your axios hook
import confetti from 'canvas-confetti';


const Register = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState('');
  const [uploading, setUploading] = useState(false);
  const axiosIns = useAxios(); // axios instance with token

  // ✅ Upload image to ImgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PHOTO_KEY}`,
        formData
      );
      const url = res.data.data.url;
      setPhotoURL(url);
      Swal.fire("✅ Success!", "Photo uploaded.", "success");
    } catch (err) {
      console.error("Image upload error:", err);
      Swal.fire("❌ Error", "Failed to upload image", "error");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Form submit handler
const onSubmit = async (data) => {
  const { email, password, displayName } = data;

  try {
    const res = await createUser(email, password);
    const loggedUser = res.user;

    // ✅ Update Firebase profile
    await updateProfile(loggedUser, {
      displayName,
      photoURL: photoURL || '',
    });

    // ✅ Save user to MongoDB backend
    const userInfo = {
      uid: loggedUser.uid,
      name: displayName,
      email,
      photoURL: photoURL || '',
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    const userRes = await axiosIns.post('/api/users', userInfo);
    console.log("User saved:", userRes.data);

    // ✅ SweetAlert with confetti animation
    Swal.fire({
      title: "Account Created!",
      text: "Welcome to the platform!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      willOpen: () => {
        const duration = 1500;
        const end = Date.now() + duration;

        (function frame() {
          confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            shapes: ['circle'],
            colors: ['#ff69b4', '#ffb6c1', '#ffd700'],
          });
          confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            shapes: ['circle'],
            colors: ['#ff69b4', '#ffb6c1', '#ffd700'],
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      },
    });

    // Optional: voice message
    const message = new SpeechSynthesisUtterance(
      `Welcome ${displayName} to the platform!`
    );
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("zira")
    );
    if (femaleVoice) message.voice = femaleVoice;
    message.rate = 0.7;
    message.pitch = 1;
    message.volume = 0.8;
    window.speechSynthesis.speak(message);

    // Navigate after SweetAlert closes
    setTimeout(() => navigate('/'), 1500);

  } catch (err) {
    console.error(err);
    Swal.fire(
      "Registration Failed",
      err.message || "Something went wrong",
      "error"
    );
  }
};

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body">
          <h1 className="text-2xl text-center font-bold">Create An Account</h1>

          <fieldset className="fieldset space-y-2">

            <label className="label">Name</label>
            <input
              type="text"
              {...register('displayName', { required: true })}
              className="input"
              placeholder="Your full name"
            />
            {errors.displayName && <p className="text-red-600">Name is required</p>}

            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Your email"
            />
            {errors.email && <p className="text-red-600">Email is required</p>}

            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
            {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be at least 6 characters</p>}

            <label className="label">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
            />
            {uploading && <p className="text-blue-500">Uploading...</p>}
            {photoURL && <img src={photoURL} alt="Preview" className="w-20 h-20 rounded-full mt-2 border" />}

            <button type="submit" className="btn btn-neutral mt-4 w-full">Register</button>

            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <NavLink className="text-fuchsia-700 font-bold" to="/login">
                Log In
              </NavLink>
            </p>
          </fieldset>
        </div>
      </form>

            <div className="px-6 pb-4">
          <GoogleLogIn />
        </div>
    </div>
  );
};

export default Register;