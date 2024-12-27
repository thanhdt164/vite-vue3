import axios from 'axios';

const BASE_URL = 'https://localhost:7114'; // Thay đổi URL theo đường dẫn thực tế của bạn

var configAPI = null

const resetToken = () => {
  configAPI = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': null,
    },
  })
}

const baseCRUD = {
    // Phương thức GET
    async get(endpoint) {
      try {
        let configAPI = axios.create({
          baseURL: BASE_URL,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
          },
        })
        const res = await configAPI.get(endpoint);
        return res;
      } catch (error) {
        console.error(`URL: ${endpoint} Error fetching data:`, error);
        throw error;
      }
    },
  
    // Phương thức POST
    async post(endpoint, data) {
      try {
        let configAPI = axios.create({
          baseURL: BASE_URL,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
          },
        })
        const res = await configAPI.post(endpoint, data);
        return res;
      } catch (error) {
        console.error(`URL: ${endpoint} Error creating data:`, error);
        throw error;
      }
    },
  
    // Phương thức PUT
    async put(endpoint, data) {
      try {
        let configAPI = axios.create({
          baseURL: BASE_URL,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
          },
        })
        const res = await configAPI.put(endpoint, data);
        return res;
      } catch (error) {
        console.error(`URL: ${endpoint} Error updating data:`, error);
        throw error;
      }
    },
  
    // Phương thức DELETE
    async delete(endpoint) {
      try {
        let configAPI = axios.create({
          baseURL: BASE_URL,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
          },
        })
        const res = await configAPI.delete(endpoint);
        return res;
      } catch (error) {
        console.error(`URL: ${endpoint} Error deleting data:`, error);
        throw error;
      }
    },
  };
  
  export  { configAPI, baseCRUD, resetToken};

