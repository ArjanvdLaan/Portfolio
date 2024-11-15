// src/auth.js
import axios from 'axios';
import { Buffer } from 'buffer'; // Import Buffer from the buffer package

const CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_REDDIT_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDDIT_REDIRECT_URI;

const AUTHORIZATION_HEADER = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;

export const getRedditAuthUrl = () => {
  const scope = 'read, vote';
  const state = '1234987650';
  const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${REDIRECT_URI}&duration=temporary&scope=${scope}`;
  return authUrl;
};

export const getAccessToken = async (code) => {
  const tokenUrl = 'https://www.reddit.com/api/v1/access_token';

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
  });

  const headers = {
    Authorization: AUTHORIZATION_HEADER,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await axios.post(tokenUrl, params.toString(), { headers });
    const accessToken = response.data.access_token;
    if (accessToken) {
      console.log('Access Token Retrieved:', accessToken);
      localStorage.setItem('accessToken', accessToken); // Store the access token in localStorage
      return accessToken;
    } else {
      console.error('No access token received');
      return null;
    }
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
};

//TESTING PURPOSES
export const deleteAccessToken = () => {
  localStorage.removeItem('accessToken'); //delete token for testing purposes
  console.log('Access Token Deleted');
};

// deleteAccessToken();