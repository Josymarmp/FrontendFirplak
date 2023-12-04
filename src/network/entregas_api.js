
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  });


  async function fetchData(config) {
    try {
      const response = await api(config);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.error || 'Unknown error';
        if (error.response?.status === 401) {
          throw new Error (errorMessage);
        } else if (error.response?.status === 409) {
          throw new Error (errorMessage);
        } else {
          throw new Error(`Request failed with status: ${error.response?.status} message: ${errorMessage}`);
        }
      } else {
        throw error;
      }
    }
  }
  
  export async function fetchEntregas(){
    const response = await fetchData({ method: 'GET', url: '/entregas'});
    return response.data;
  }


  export async function fetchReports(){
    const response = await fetchData({ method: 'GET', url: '/entregas/reports'});
    return response.data;
  }


