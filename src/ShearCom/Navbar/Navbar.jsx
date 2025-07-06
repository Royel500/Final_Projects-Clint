import React from 'react';
import { NavLink, Link, useNavigate, } from 'react-router';
import Logo from '../Logo';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import './navbar.css'
const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
 


  const logOutt = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged out successfully!",
          icon: "success",
        });
        navigate('/');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const navItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/about">About Us</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/services">Service</NavLink></li>
          <li><NavLink to="/dasboard">Dasboard</NavLink></li>
          <li><NavLink to="/sendpercel">Send Percel</NavLink></li>
          <li><NavLink to="/track">Track Order</NavLink></li>
          <li><NavLink to="/pricing">Pricing</NavLink></li>
          <li><NavLink to="/rider">Be a Rider</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-green-400 via-sky-400 to-red-400 shadow-sm ">
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
