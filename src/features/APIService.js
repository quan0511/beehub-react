import axios from "axios";

class APIService {    
    URL_REST_API = 'http://localhost:8080/api';
    axios = axios.create({
        baseURL: this.URL_REST_API,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })
}

export default new APIService();
