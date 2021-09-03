import axios from 'axios';

const API_URL = "https://memories5.herokuapp.com/api/v1";

const getData = JSON.parse(localStorage.getItem("auth"));

const postUpload = (data) => {
    return axios.post(`${API_URL}/uploadData`, data, {
        method:"POST",
        headers:{
            "authorization":getData.token 
        }
    })
}

const getPost = () => {
    return axios.get(`${API_URL}/allpost`, {
        medthod:"GET",
            headers:{
                "authorization":getData.token
            }
    });
}

const getLike = (id) => {
    return axios.put(`${API_URL}/like`, id, {
        medthod:"put",
        headers:{
            "authorization":getData.token
        }
    })
}

const getUnlike = (id) => {
    return axios.put(`${API_URL}/unlike`, id, {
        medthod:"put",
        headers:{
            "authorization":getData.token
        }
    })
}

export {
    postUpload,
    getPost,
    getLike,
    getUnlike
}