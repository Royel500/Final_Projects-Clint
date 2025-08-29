import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL:`http://localhost:3500`
})
const useAxiosecure = () => {
    const { user } = useAuth();
    axiosSecure.interceptors.request.use(config => {
        if (user && user.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        } else {
            delete config.headers.Authorization;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });
    return axiosSecure;
};
export default useAxiosecure;