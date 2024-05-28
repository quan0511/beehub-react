import axios from "axios";

class APIService {    
    URL_REST_API = 'http://localhost:9001/api';
    fetchDataPeoplePage = (id) =>{
        axios.get(`${this.URL_REST_API}/peoplepage/${id}`).then((res)=>res.data);
        
    }
}

export default new APIService();
