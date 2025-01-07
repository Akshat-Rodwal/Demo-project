import axios from 'axios';

// Fetch all users
export const fetchUsers = async () => {
  const response = await axios.get('http://localhost:5000/api/data');
  return response.data;
};

// Add a new user
export const addUser = async (newUser) => {
  const response = await axios.post('http://localhost:5000/api/data', newUser);
  return response.data;
};

// Delete a user
export const deleteUser = async (userId) => {
  const response = await axios.delete(`http://localhost:5000/api/data/${userId}`);
  return response.data;
};
