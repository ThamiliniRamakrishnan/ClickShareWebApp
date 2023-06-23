import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { client } from '../client';

import shareVideo from '../assets/share.mp4';
import logo from '../assets/CSW.png';

const LoginNew = () => {
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (response) => {
    const credential = response.credential;
    const details = jwt_decode(credential);

    localStorage.setItem('user', JSON.stringify(details))
    const { name, picture, sub } = details;
    const doc = {
        _id:sub,
        _type:'user',
        userName:name,
        image:picture
    }

    client.createIfNotExists(doc)
    .then(() => {
        navigate('/',{replace:true})
      })
  };

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="500px" />
          </div>

          <div className="shadow-2xl">
            <GoogleOAuthProvider clientId='436504083311-ennbnr6e0fvidf4q2aij6tdp6tdok9gl.apps.googleusercontent.com'>
                <GoogleLogin 
                    onSuccess={handleGoogleLoginSuccess}
                    onFailure={handleGoogleLoginError}
                />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNew;
