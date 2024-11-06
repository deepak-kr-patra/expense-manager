import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/auth/useLogin';
import useScreenWidth from '../zustand/useScreenwidth';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();
  const { screenWidth } = useScreenWidth();

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(passwordVisibility === false ? true : false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  const toggleLabel = (inputDiv, inputFieldID) => {
    inputDiv.addEventListener('focusin', () => {
      inputDiv.classList.add('input-div-clicked');
    });

    inputDiv.addEventListener('focusout', () => {
      const inputField = document.getElementById(inputFieldID);

      if (inputField.value.length > 0) {
        inputDiv.classList.add('input-div-clicked');
      } else {
        inputDiv.classList.remove('input-div-clicked');
      }
    });
  }

  useEffect(() => {
    const usernameDiv = document.getElementById('username-div-login');
    const passwordDiv = document.getElementById('password-div-login');

    toggleLabel(usernameDiv, "username-div-input-login");
    toggleLabel(passwordDiv, "password-div-input-login");
  });

  const boxWidth = screenWidth <= 550 ? "w-[90%]" : "w-[500px]";

  return (
    <div className='w-full h-full flex items-center justify-center login-page'>
      <div className={`flex flex-col items-center justify-center ${boxWidth} mx-auto`}>
        <div className="w-full h-full rounded-lg shadow-md bg-white">

          <div className='bg-blue-600 p-8 max-sm:p-6 max-sm:px-2 rounded-t-lg'>
            <h1 className='text-3xl max-sm:text-2xl font-light text-center text-gray-100'>
              Login <span className='header'>EXPENSE MANAGER</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col p-8 max-sm:p-6 max-sm:px-2'>
            <div className='input-div relative mb-8 max-sm:mb-6' id='username-div-login'>
              <input
                type="text"
                id='username-div-input-login'
                className="input input-bordered focus:outline-none focus:border-black w-full h-12"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username-div-input-login">Enter Your Username</label>
            </div>

            <div className='input-div relative mb-8 max-sm:mb-6' id='password-div-login'>
              <input
                type={!passwordVisibility ? "password" : "text"}
                id='password-div-input-login'
                className="input input-bordered focus:outline-none focus:border-black w-full h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password-div-input-login">Enter Your Password</label>
              <div className='eye-icon' onClick={() => togglePasswordVisibility()}>
                {!passwordVisibility ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div>
              <button className='btn btn-block btn-sm max-sm:text-sm auth-button' disabled={loading}>
                {loading ? <span className='loading loading-spinner'></span> : "Login"}
              </button>
            </div>

            <div className="divider before:h-[1.6px] after:h-[1.6px]">OR</div>

            <div className='max-sm:text-sm signup-instead'>
              Don't have an account?
              <span className='h-12 flex items-center'>
                <Link to="/signup" className='hover:underline text-blue-600'>
                  Sign Up
                </Link>
              </span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login