import axios from 'axios';
import _ from 'lodash'
import Service from './service';
import CONFIG from './config';
//---
axios.defaults.baseURL = CONFIG.API_ENDPOINT || "http://localhost:3030";
axios.interceptors.request.use(function (config) {
    // console.log("axios.interceptors.request >> config",config);
    _.merge(config.headers, Service.authHeader())
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // console.log('axios.interceptors.response error.message::',error.message);
    // console.log('axios.interceptors.response error.response::',error.response);
    if(error?.response?.data){
        console.error('axios.interceptors.response error.response.data::',error.response.data);
    } else{
        console.error('axios.interceptors.response error.response::',error.response);
    }
    if (error?.response?.status == 401 && error?.response?.config?.url!="login") {
        sessionStorage.removeItem('webAppUser');
        window.location.href = "/login";
    }
    return Promise.reject(error);
});
export default axios;