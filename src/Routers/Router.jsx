import React from 'react';

import {
  createBrowserRouter,
  
} from "react-router";
import RootLayout from '../LayOuts/RootLayout';
import Home from '../Pages/Home/Home';
import AuthLAyOut from '../LayOuts/AuthLAyOut';
import LogIn from '../Pages/Authentication/LogIn';
import Register from '../Pages/Authentication/Register';
import Map from '../Pages/Map/Map';
import AboutUs from '../Components/About';
import PricingCalculator from '../Components/PricingCalculator';
import Services from '../Components/Services';
import SendPercel from '../Components/SendPercel';
import PrivateRoute from './PrivateRoute';
import DasboardLayout from '../LayOuts/DasboardLayout';
import MyPercel from '../Components/MyPercel';
import Payment from '../Payment/Payment ';
import PaymentHistory from '../Payment/PaymentHistory';
import Track from '../Components/Track';
import Rider from '../Components/Rider';
import ActiveRiders from '../Components/ActiveRiders';
import PendingRiders from '../Components/PendingRiderss';
import RiderDetails from '../Components/Details';
import MakeAdmin from '../Components/MakeAdmin';
import AdminRoute from './AdminRoute';
import AssignRider from '../Components/AssignRider';
import RiderRoute from './RiderRoute';
import PendingDelivery from '../Components/PendingDalivary';



 export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            index:true,
            element:<Home></Home>
        },
        {
          path:'/track' ,
          element:<Map></Map>
        },
        {
          path:'/about' ,
          element:<AboutUs></AboutUs>
        },
        {
          path:'/pricing',
          element:<PricingCalculator></PricingCalculator>
        },
      {  path:'/services',
        element: <Services></Services>
      },
      {
        path:'/sendpercel' ,
        element:<SendPercel></SendPercel>
      },
      {
        path:'/rider',
        element:<Rider></Rider>
      }
    ]
  },
  {
    path:'/',
    element:<AuthLAyOut></AuthLAyOut>,
    children:[
      {
        path:'/login',
        element:<LogIn></LogIn>
      },
      {
        path:'/register' ,
        element:<Register></Register>
      }
    ]
  },
  {
    path:'/dasboard',
    element:<PrivateRoute>
      <DasboardLayout></DasboardLayout>
    </PrivateRoute>,
 children:[
  
  {
    index:true,
    element:<MyPercel></MyPercel>
  },
  {
    path:'myPercel',
    element:<MyPercel></MyPercel>
  },
  {
    path:'payment/:parcelId',
    element:<Payment></Payment>
  },
  {
    path:'paymenthistory',
    element:<PaymentHistory></PaymentHistory>
  },
  {
    path:'track',
    element:<Track></Track>
  },
  {
    path:'activeRider',
    element: <AdminRoute>  <ActiveRiders></ActiveRiders></AdminRoute>
  },
  {
    path:'pendingRider',
    element: <AdminRoute><PendingRiders></PendingRiders> </AdminRoute> 
  },
  {
    path:'rider/:id',
    element: <AdminRoute><RiderDetails></RiderDetails> </AdminRoute> 
  },
  {
    path:'makeAdmin',
    element: <AdminRoute> <MakeAdmin></MakeAdmin></AdminRoute> 
  },
  {
    path:'assign-rider',
    element:<AdminRoute> <AssignRider></AssignRider> </AdminRoute>
  },
  {
    path:'pendingDelivery',
    element:<RiderRoute><PendingDelivery></PendingDelivery> </RiderRoute> 
  }

 ]
  }
]);