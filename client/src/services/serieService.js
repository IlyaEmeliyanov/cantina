import http from './httpService'

const key = 'token';

const postSerie = (body) => {
    const jwt = localStorage.getItem(key);
    http.post('/serie', body, {headers: {Authorization: 'Bearer '+jwt}});
};

export default{
    postSerie
};