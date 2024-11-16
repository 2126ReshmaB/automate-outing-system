import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import Navbar1 from './Navbar1';
import googleLogo from "../assets/google-logo.svg";

const Signup = () => {
  const { createUser, loginwithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/student";

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Sign up successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleRegister = () => {
    loginwithGoogle()
      .then((result) => {
        const user = result.user;
        alert("Sign up successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div>
      <div className='py-0.5'>
        <Navbar1 />
      </div>
      <div className="bg-gray-100 py-5 mt-10 flex flex-col justify-center sm:py-12">
        <div className="relative py-5 sm:max-w-md sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-xl font-semibold">Sign Up Form</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleSignUp} className="py-6 text-sm leading-4 space-y-4 text-black sm:text-sm sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                    />
                  </div>
                  {error && <p className='text-red-500'>{error}</p>}
                  <p>If you already have an account, please <Link to="/login" className='text-blue-500 underline hover:text-black'>Login</Link> here</p>
                  <div className="relative">
                    <button className="bg-blue-700 text-white rounded-md px-4 py-1 hover:bg-black">Sign up</button>
                  </div>
                </form>
              </div>

              <hr />
              <div className='flex w-full items-center flex-col mt-5 gap-3'>
                <button onClick={handleRegister} className='block'>
                  <img src={googleLogo} alt="Google Logo" className='w-10 h-10 inline-block' />
                  Sign up with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
