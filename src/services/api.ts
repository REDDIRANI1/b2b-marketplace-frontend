import axios from 'axios';

const api = axios.create({
  baseURL: 'https://b2b-marketplace-backend-1.onrender.com',
});

export default api;
