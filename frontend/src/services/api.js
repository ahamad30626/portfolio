// API service — only functions actively used by components are kept
const API_BASE = 'http://localhost:8080/api';

const request = async (path, options = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

// Used by: Projects.jsx
export const fetchProjects = () => request('/projects');

// Used by: Contact.jsx
export const submitContact = (data) =>
  request('/contact', { method: 'POST', body: JSON.stringify(data) });
