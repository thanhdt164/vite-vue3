import axios from "axios";

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const instance = axios.create({
    baseURL: 'http://example.com/api',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json', // Header mặc định cho tất cả các request
    },
  });
  
// Phương thức GET
function get(endpoint) {
    return instance.get(endpoint);
}

// Phương thức POST
function post(endpoint, params) {
    return instance.post(endpoint, params);
}
// Phương thức PUT
function put(endpoint, data) {
    return instance.put(endpoint, data);
}
  
// Phương thức DELETE
function delete(endpoint) {
    return instance.delete(endpoint);
}