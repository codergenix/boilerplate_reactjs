const API_URL = "http://localhost:3030/"; // [ api pc url or IP ]
const API_ENDPOINT = `${API_URL}v1/`;
const API_HEADER = { headers: { 'Authorization': `${localStorage.getItem('VUEtoken')}`,'Content-Type' : 'application/json' } }

const CONFIG = { API_ENDPOINT, API_HEADER };

export default CONFIG;