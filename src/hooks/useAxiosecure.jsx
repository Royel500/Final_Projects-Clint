import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL:`http://localhost:3500`
})
const useAxiosecure = () => {
    return axiosSecure ;
};

export default useAxiosecure;