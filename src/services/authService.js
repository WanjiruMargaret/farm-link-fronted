// authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // adjust if needed

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};
