import axios from 'axios'
import {toast} from 'react-toastify'

axios.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    if (error.response.status === 401)
      toast.error("Unauthorized");
    if(error.response.status === 400)
      toast.error("User already exists");
    if(error.response.status === 500)
      toast.error("Server Error");

    
    return Promise.reject(error.data);
});

function setJwt(key){
    axios.defaults.headers['x-auth-token'] = key;
}

export default{
    get: axios.get,
    post: axios.post,
    patch: axios.patch,
    put: axios.put,
    delete: axios.delete,
    setJwt
}