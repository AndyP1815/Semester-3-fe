import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Skect } from '../assets';
import useLoginApi from '../api-layer/api-LogIn';
import TokenManager from '../Token/TokenManager';
import AuthAPI from '../Token/AuthAPI';

const SignIn = ({setupStompClient}) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [CheckAuthorization,setCheckAuthorization] = useState(false);
  
  const navigate = useNavigate();


  const handleClick = async (event) => {
    event.preventDefault(); 

    debugger
    try {
      const user = {
        username: Username,
        password: Password
      };
    
      const response = await useLoginApi.postTokens(user);
    
        const token = response.data.accessToken;
        const refreshToken = response.data.refreshToken
        TokenManager.setTokens(token,refreshToken);
        debugger
        setupStompClient(TokenManager.getClaims.userId)
        navigate("/");
    
    } catch (error) {
      console.error('Error creating user:', error);
      if(error.response.status === 400)
      {
        setCheckAuthorization(true)
      }
    }
  };    

  useEffect(() => {
    setCheckAuthorization(false)

  },[])

  return (
    
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={Skect} alt="Skect" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        { CheckAuthorization ? 
       <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
       <span class="font-medium">Alert!</span> The credentials are not right
     </div>
        :  
        ''
        }
       
       <form className="space-y-6" onSubmit={handleClick} method="POST">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
          <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="/SignIn" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
