

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"
import { UserData } from '../../utils/LocaStorage';
import { GoogleUserData } from '../../pages/Userdata/GoogleUserData';
import { AccesToken } from '../../utils/LocaStorage';
export const GoogleAuth = () => {
  const navigate = useNavigate();
  // const [user, setUser] = useState<any>(null);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse: any) => {
      // console.log('Login Successful:', codeResponse);

      const fetchGoogleData = async () => {
      
        await GoogleUserData(codeResponse.access_token);
      

      };
      fetchGoogleData();


      // setUser(codeResponse);
    },
    onError: (error) => console.error('Login Failed:', error),
  });

  // useEffect(() => {
  //   if (user?.access_token) {
  //     axios
  //       .get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
  //         headers: {
  //           Authorization: `Bearer ${user.access_token}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log('User Profile:', response.data);
  //         // Save user data to database or store it in local storage
  //         setUser(response.data);
  //         console.log(user)
  //         // setUserData(response.data);
  //         // localStorage.setItem('UserData',response.data);


  //       })
  //       .catch((error) => console.error('Error fetching user info:', error));
  //   }
  // }, [user]);


  return (
    <>
      <button type="button" onClick={() => login()} className="text-white  hover:bg-yellow-200 border hover:text-black px-12 py-2 text-sm font-bold rounded-lg w-full mt-2">Continue With Google</button>
    </>
  )
}