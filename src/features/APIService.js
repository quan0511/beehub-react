import axios from "axios";

class APIService {    
    URL_REST_API = 'https://beehub-spring.onrender.com/api';
    
    createRequirement = async (id, data, token) => {
        let isSuccess;
        try {
            let response = await axios.post(`${this.URL_REST_API}/send-requirement/${id}`,JSON.stringify(data), {
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "application/json",
                    withCredentials: true
                }
            })
            if (response.status == '200') {
                isSuccess = response.data;
            } else {
                console.error('An error occurred while submitting.');
            }
            
        } catch (error) {
            console.log(error);
        }
        return isSuccess;
    }
}

export default new APIService();
