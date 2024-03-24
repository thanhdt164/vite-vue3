import axios from "axios";

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const instance = axios.create({
    baseURL: 'https://localhost:7114',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json', // Header mặc định cho tất cả các request
      'Authorization':localStorage.getItem('token'),
    },
  });
  
// Phương thức GET
function getAPI(endpoint) {
    return instance.get(endpoint);
}

// Phương thức POST
function postAPI(endpoint, params) {
    return instance.post(endpoint, params);
}
// Phương thức PUT
function putAPI(endpoint, data) {
    return instance.put(endpoint, data);
}
  
// Phương thức DELETE
function deleteAPI(endpoint) {
    return instance.delete(endpoint);
}
function login(data){
    return instance.post("/AuthenticateController/login",data)
}
function getAllAnalysisContent(){
    return instance.get("/AnalysisContent/get-all")
}
export default {login,getAllAnalysisContent};