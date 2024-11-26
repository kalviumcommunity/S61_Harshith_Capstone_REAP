import axios from 'axios';

const api = axios.create({
  baseURL: 'https://s61-harshith-capstone-reap.onrender.com/user', 
});

export default api;
