import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user , loading} =useAuth();
    if(loading){
        return(
            <div>
         
            <span className="loading loading-bars loading-md"></span>
<span className="loading loading-bars loading-lg"></span>
<span className="loading loading-bars loading-xl"></span>   </div>
        )
    }
    if(!user){
        <Navigate to='/login'></Navigate>
    }
    return children ;
};

export default PrivateRoute;