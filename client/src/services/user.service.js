import axios from 'axios';

const API_URL = "https://memories5.herokuapp.com/auth/api";

const signupAuth = (data) => {
    return axios.post(`${API_URL}/signup`, data);
}

export {
    signupAuth
}