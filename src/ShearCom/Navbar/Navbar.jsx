import React from 'react';
import { NavLink, Link, useNavigate, } from 'react-router';
import Logo from '../Logo';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import './navbar.css'
import useAxiosecure from '../../hooks/useAxiosecure';
import confetti from 'canvas-confetti';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
 const axiosSecure = useAxiosecure();


const logOutt = () => {
  Swal.fire({
    title: 'You are about to log out!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, log out!',
    cancelButtonText: 'Cancel',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Update lastLogout and set isActive = false
        await axiosSecure.post('/api/users/activity', {
          email: user?.email,
          isActive: false, // backend will automatically update lastLogout
        });

        // Perform logout
        await logOut();

        // SweetAlert success with confetti animation
        Swal.fire({
          title: 'Logged Out Successfully!',
          icon: 'success',
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
          'You have successfully logged out. See you again!'
        );
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(
          (voice) =>
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('zira')
        );
        if (femaleVoice) message.voice = femaleVoice;
        message.rate = 0.7;
        message.pitch = 1;
        message.volume = 0.8;
        window.speechSynthesis.speak(message);

        // Navigate after short delay
        setTimeout(() => navigate('/'), 1500);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
        });
      }
    }
  });
};


  const navItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/dasboard">Dasboard</NavLink></li>
          <li><NavLink to="/sendpercel">Send Percel</NavLink></li>



      {user && (
        <>
    
          <li><NavLink to="/track">Track Order</NavLink></li>
          <li><NavLink to="/pricing">Pricing</NavLink></li>
          <li><NavLink to="/rider">Be a Rider</NavLink></li>
        </>
      )}
                    <li><NavLink to="/services">Service</NavLink></li>
                          <li><NavLink to="/about">About Us</NavLink></li>
                          <li><NavLink to="/help">Ai Help</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-gray-300 shadow-sm ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <div className="tooltip tooltip-bottom" data-tip={user.displayName }>
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
            <button onClick={logOutt} className="btn btn-sm ml-3">
              Logout
            </button>
          </>
        ) : (
          <>
        
          <Link to="/register" className="btn mx-2 btn-sm">Register</Link>
          <Link to="/login" className="btn btn-sm">Login</Link> 
          
            </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
