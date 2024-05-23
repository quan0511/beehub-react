class APIService {    
    URL_REST_API = 'http://192.168.1.5:9001/api';
    // getFriendPosts(){
    //     let url = URL_REST_API+"friendposts/1";
    //     console.log(url);
    //     return fetch(url,{ 
    //         method: 'get',
    //             headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json',
    //             },
    //             'credentials': 'same-origin'
    //     })
    //     .then(res => res.json());        
    // }

}

export default new APIService();