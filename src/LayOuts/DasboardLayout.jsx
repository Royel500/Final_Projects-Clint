import React from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  FaHome,
  FaBoxOpen,
  FaHistory,
  FaMapMarkedAlt,
  FaUserFriends,
  FaUserClock,
  FaTruck,
} from 'react-icons/fa';
import useRole from '../hooks/useRole';

const DasboardLayout = () => {
 

  const {role,roleLoading} =useRole();
  console.log(role);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 lg:hidden w-full">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-xl font-bold">Dashboard</div>
        </div>

        {/* Main Page Content Here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          {/* Sidebar Links with React Icons */}
          <li>
            <NavLink to="/" className="flex items-center gap-2">
              <FaHome className="text-lg" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dasboard/myPercel" className="flex items-center gap-2">
              <FaBoxOpen className="text-lg" /> My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to="/dasboard/paymenthistory" className="flex items-center gap-2">
              <FaHistory className="text-lg" /> History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dasboard/track" className="flex items-center gap-2">
              <FaMapMarkedAlt className="text-lg" /> Track a Package
            </NavLink>
          </li>
{/* ---User role-- */}
{!roleLoading && role === "user"  && 
<>
<li>
            <NavLink to="/dasboard/manageProfile" className="flex items-center gap-2">
              <FaMapMarkedAlt className="text-lg" /> Manage Profile   </NavLink>
          </li>
</>}
              {/* ---rider link */}

          {!roleLoading && role === 'rider' && 
          <>
<li>
            <NavLink to="/dasboard/manageProfile" className="flex items-center gap-2">
              <FaMapMarkedAlt className="text-lg" /> Manage Profile   </NavLink>
          </li>
          <li>
  <NavLink to="/dasboard/pendingDelivery" className="flex items-center gap-2">
    <FaTruck className="text-lg" /> Pending Delivery
  </NavLink>
</li>

          </>}
          {/* ---admin links---- */}
      { !roleLoading && role=== 'admin' &&
        <>

            <li>
            <NavLink to="/dasboard/adminProfile" className="flex items-center gap-2">
              <FaUserFriends className="text-lg" /> Manage profile
            </NavLink>
          </li>
            <li>
            <NavLink to="/dasboard/activeRider" className="flex items-center gap-2">
              <FaUserFriends className="text-lg" /> Active Riders
            </NavLink>
          </li>
          <li>
            <NavLink to="/dasboard/pendingRider" className="flex items-center gap-2">
              <FaUserClock className="text-lg" /> Pending Riders
            </NavLink>
          </li>
          <li>
            <NavLink to="/dasboard/makeAdmin" className="flex items-center gap-2">
           <FaUserClock className="text-lg" />   Admin Page
            </NavLink>
          </li>
          <li>
<NavLink
  to="/dasboard/assign-rider"
>
  🚚 Assign Rider
</NavLink>
          </li>

        </>
      }

        </ul>
      </div>
    </div>
  );
};

export default DasboardLayout;
