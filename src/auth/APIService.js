const URL_REST_API = 'http://172.16.2.5:9001/api/';
class APIService {    
    getFriendPosts(){
        let url = URL_REST_API+"friendposts/1";
        console.log(url);
        return fetch(url,{ 
            method: 'get',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                },
                'credentials': 'same-origin'
        })
        .then(res => res.json());        
    }

}

export default new APIService();