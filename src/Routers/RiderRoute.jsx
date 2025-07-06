import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const RiderRoute = ({children}) => {
   
        const {user,loading} = useAuth();
    const {role,roleLoading } =useRole();

    if(loading ||roleLoading ){

        return <span>Loading......... </span>
    }

    if(!user || role !== 'rider' ){
        return <Navigate to='/login'></Navigate>
    }

    return children ;

};

export default RiderRoute;