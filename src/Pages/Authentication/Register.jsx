import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth'; // custom context hook
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import GoogleLogIn from './GoogleLogIn';

const Register = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = data => {
    const { email, password, displayName } = data;

    createUser(email, password)
      .then(res => {
        const loggedUser = res.user;

        // ✅ Update display name
        updateProfile(loggedUser, {
          displayName: displayName,
        })
        .then(() => {
          Swal.fire({
            title: "Account created successfully!",
            icon: "success"
          });
          navigate('/');
        })
        .catch(err => {
           Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error"
        });
        });

      })
   
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body">
          <h1 className="text-2xl text-center font-bold">Create An Account !!</h1>
          <fieldset className="fieldset">

            <label className="label">Name</label>
            <input
              type="text"
              {...register('displayName', { required: true })}
              name="displayName"
              className="input"
              placeholder="Enter your name"
            />
            {errors.displayName && <p className="text-red-600">Name is required</p>}

            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-600">Email is required</p>}

            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
            {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be at least 6 characters</p>}

            <button type="submit" className="btn btn-neutral mt-4">Register</button>

            <p>Already have an account? <NavLink className="text-fuchsia-700 font-bold" to="/login">Log In Now</NavLink></p>
          </fieldset>
        </div>
      </form>

      <GoogleLogIn />
    </div>
  );
};

export default Register;
