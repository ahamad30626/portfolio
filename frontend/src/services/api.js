import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchProjects = () => api.get('/projects').then(r => r.data);
export const fetchSkills = () => api.get('/skills').then(r => r.data);
export const fetchExperience = () => api.get('/experience').then(r => r.data);
export const submitContact = (data) => api.post('/contact', data).then(r => r.data);
export const fetchHealth = () => api.get('/health').then(r => r.data);

export default api;
