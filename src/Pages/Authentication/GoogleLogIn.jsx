import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import confetti from 'canvas-confetti';

const GoogleLogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const { googleMama } = useAuth();
  const axiosIns = useAxios();
const handleGoole = () => {
  googleMama()
    .then(async (res) => {
      const user = res.user;

      // Save user to MongoDB backend
      const userInfo = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL || '',
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      await axiosIns.post('/api/users', userInfo);

      // 🎉 Success SweetAlert with confetti
      Swal.fire({
        title: "Login Successful!",
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

            if (Date.now() < end) requestAnimationFrame(frame);
          })();
        },
      });

      // Navigate after SweetAlert closes
      setTimeout(() => navigate(from), 1500);
    })
    .catch((err) => {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    });
};


  return (
    <div className='text-center'>
      <div className="divider">Or</div>
      {/* Google */}
      <button
        onClick={handleGoole}
        className="btn w-full bg-cyan-200 text-black border my-3"
      >
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogIn;