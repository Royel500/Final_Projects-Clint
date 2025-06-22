import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../ShearCom/Navbar/Navbar';
import Footer from '../ShearCom/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;