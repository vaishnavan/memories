import axios from 'axios';

const API_URL = "https://memories5.herokuapp.com/api/v1";

const getData = JSON.parse(localStorage.getItem("auth"));


const getPost = () => {
    return axios.get(`${API_URL}/allpost`, {
        medthod:"GET",
            headers:{
                "authorization":getData.token
            }
    });
}

export {
    getPost
}