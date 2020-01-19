import http from './httpService'
import jwtDecode from 'jwt-decode'

const key = 'token';

const signup = async(body) => {
    const {name, email, password, confirmPassword} = body;
    const {token} = await http.post('/signup', {name,email,password,confirmPassword});
    return token;
}

const login = async(body) => {
        const {email, password} = body;
        const {token} = await http.post('/login', {email, password});
        http.setJwt(token);
        return token;
}

const loginWithJwt = (jwt) => {
    localStorage.setItem(key, jwt);
}

const getCurrentUser = async() => {
        const jwt = localStorage.getItem(key);
        if(!jwt) return;
        const {value} = await jwtDecode(jwt);
        const {data} = (await http.get(`/getMe/${value}`, {headers: { Authorization: "Bearer " + jwt }}));
        return data;
}

export default{
    signup,
    login,
    loginWithJwt,
    getCurrentUser
}