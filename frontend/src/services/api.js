import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchProperties = async () => {
  const response = await axios.get(`${API_BASE_URL}/properties`);
  return response.data;
};

export const fetchTenants = async () => {
  const response = await axios.get(`${API_BASE_URL}/tenants`);
  return response.data;
};

export const createProperty = async (property) => {
  const response = await axios.post(`${API_BASE_URL}/properties`, property);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/properties/${id}`);
  return response.data;
};

export const createTenant = async (tenant) => {
  const response = await axios.post(`${API_BASE_URL}/tenants`, tenant);
  return response.data;
};

export const deleteTenant = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/tenants/${id}`);
  return response.data;
};

export const updateTenant = async (id, tenant) => {
  const response = await axios.put(`${API_BASE_URL}/tenants/${id}`, tenant);
  return response.data;
};

export const updateProperty = async (id, property) => {
  const response = await axios.put(`${API_BASE_URL}/properties/${id}`, property);
  return response.data;
};

export const fetchMaintenanceTasks = async () => {
  const response = await axios.get(`${API_BASE_URL}/maintenance`);
  return response.data;
};

// Create a new maintenance task
export const createMaintenanceTask = async (taskData) => {
  const response = await axios.post(`${API_BASE_URL}/maintenance`, taskData);
  return response.data;
};

// Update a maintenance task's status or details
export const updateMaintenanceTask = async (taskId, updates) => {
  const response = await axios.put(`${API_BASE_URL}/maintenance/${taskId}`, updates);
  return response.data;
};

// Delete a maintenance task
export const deleteMaintenanceTask = async (taskId) => {
  const response = await axios.delete(`${API_BASE_URL}/maintenance/${taskId}`);
  return response.data;
};