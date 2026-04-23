import axios from 'axios';

const BASE_URL = 'http://localhost:8083';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProfiles = () => api.get('/profile');

export const getProfileById = (id) => api.get(`/profile/${id}`);

export const saveProfile = (profileData) => api.post('/profile', profileData);

export const updateProfile = (id, profileData) =>
  api.put(`/profile/${id}`, profileData);

export const deleteProfile = (id) => api.delete(`/profile/${id}`);
