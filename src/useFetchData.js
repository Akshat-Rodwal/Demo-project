
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('http://localhost:5000/api/data');
  return response.data;
};

export const useFetchData = () => {
  return useQuery('userData', fetchData);
};
