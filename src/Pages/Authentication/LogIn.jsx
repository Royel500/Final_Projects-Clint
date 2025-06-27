import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router';
import GoogleLogIn from './GoogleLogIn';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const LogIn = () => {
    const {register,handleSubmit,  formState: { errors },} = useForm();
   const {signIn} = useAuth();
   
  const navigate = useNavigate();
   const location = useLocation();
  const from = location.state?.from || '/' ;

    const onSubmitt = data =>{

        signIn(data.email,data.password)
        .then( () =>{
                  Swal.fire({
  title: "You are Successfully LogIn!",
  icon: "success",
  draggable: true
});
  navigate(from);
        })
              .catch(err => {
                 Swal.fire({
                title: "Error",
                text: err.message,
                icon: "error"
              });
              });


    }
    return (
           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmitt)} >
      <div className="card-body">
    <h1 className='text-2xl text-center font-bold'> Please LogIn Your Account !! </h1>
        <fieldset className="fieldset">

          <label className="label">Email</label>
          <input type="email"
           {...register('email' ,{required:true })} 
            className="input" placeholder="Email" />
                  {errors.email && <p role="alert">{errors.email.message}</p>}

          <label className="label">Password</label>
          <input type="password"
           {...register('password' , {required:true , minLength:6})}
            className="input" placeholder="Password" />
   {errors.password?.type === 'required' && <p className='text-red-700'>Password is required</p>}
   {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters </p> }

          <div><a className="link link-hover">Forgot password?</a></div>

          <button type='submit' className="btn btn-neutral mt-4">Login</button>
       <p>Don't have an account ? <NavLink to='/register'><span className='text-fuchsia-800 font-bold'>Register Now</span></NavLink>  </p>
        </fieldset>
      </div>
      </form>
      <GoogleLogIn></GoogleLogIn>
    </div>

    );
};

export default LogIn;