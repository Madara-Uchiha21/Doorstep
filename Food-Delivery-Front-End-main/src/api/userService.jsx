// src/api/userService.js
import API from './api';

export const fetchProfile = async () => {
  try {
    const response = await API.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Profile fetch failed:', error);
    throw error; // Re-throw to let components handle the error if needed
  }
};
