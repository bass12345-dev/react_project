
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AccesToken, UserData } from '../../utils/LocaStorage';
export const GoogleUserData = (access_token: any) => {
  if (access_token) {
    axios
      .get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        localStorage.removeItem(UserData)
        let userdata = {
          given_name: response.data.given_name,
          family_name: response.data.family_name,
          id: response.data.id,
        }
        localStorage.setItem(UserData, JSON.stringify(userdata))
        localStorage.setItem(AccesToken, access_token);
        location.reload();
        return true;

      })
      .catch((error) => console.error('Error fetching user info:', error));
  } else {
    return false
  }
}



