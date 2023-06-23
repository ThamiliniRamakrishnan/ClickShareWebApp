import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();  

  const handleGoogleSignIn = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profile))
    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
        _id:googleId,
        _type:'user',
        userName:name,
        image:imageUrl
    }

    client.createIfNotExists(doc)
    .then(() => {
        navigate('/',{replace:true})
      })
  };

  useEffect(() =>{
    // Load the Google Sign-In API script dynamically
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Define the global callback function for the Google API
    window.handleGoogleSignIn = handleGoogleSignIn;

    window.google.accounts.id.initialize({
        client_id: '436504083311-ennbnr6e0fvidf4q2aij6tdp6tdok9gl.apps.googleusercontent.com',
        // client_id:process.env.REACT_APP_GOOGLE_API_TOKEN,
        callback:handleGoogleSignIn
    });
  },[])

  return (
    <div className='flex justify-start items-center flex-col h-screen' >
        <div className='relative w-full h-full'>
            <video 
                src={shareVideo}
                type='video/mp4'
                loop
                controls={false}
                muted
                autoPlay
                className='w-full h-full object-cover'
            />
            
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                <div className='p-5'>
                    <img
                        src={logo}
                        alt='logo'
                        width='130px'
                    />
                </div>

                <div className='shadow-2x1 signIn'>
                    <button
                        type="button"
                        className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                        onClick={() => window.google.accounts.id.prompt()}
                    >
                        <FcGoogle className="mr-4" /> Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login