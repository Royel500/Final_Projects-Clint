import React from 'react';
import { Outlet } from 'react-router';
import authpic from '/authImage.png'
import Logo from '../ShearCom/Logo';
const AuthLAyOut = () => {
    return (
       <div className=" p-12 bg-base-200 ">

        <div>
                <Logo></Logo>
        </div>
  <div className="hero-content mx-auto flex-col lg:flex-row-reverse">
   
   <div className='flex-1/2 '>
     <img src={authpic}
      className=" max-w-md rounded-lg shadow-2xl"
    />
    </div>
    <div className='flex-1/2 ml-20'>
    <Outlet></Outlet>
    </div>

  </div>
</div>
    );
};

export default AuthLAyOut;