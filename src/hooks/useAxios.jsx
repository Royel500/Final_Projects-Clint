import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL:`http://https://assignment-12-server-indol-ten.vercel.app`
})
const useAxios = () => {
    return axiosInstance;
};

export default useAxios;