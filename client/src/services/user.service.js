import axios from 'axios';

const API_URL = "https://memories5.herokuapp.com/auth/api";

const signupAuth = (data) => {
    return axios.post(`${API_URL}/signup`, data);
}

const signinAuth = (data) => {
    return axios.post(`${API_URL}/signin`, data);
}

const forgotPass = (data) => {
    return axios.post(`${API_URL}/resetpass`, data);
}

const newPass = (data) => {
    return axios.post(`${API_URL}/newpassword`, data);
}

export {
    signupAuth,
    signinAuth,
    forgotPass,
    newPass,
}