import axios from 'axios';
const LOGIN_BASE_URL="https://glacial-thicket-65471.herokuapp.com/auth/";

class LoginService
{
        login(credentials){
            return axios.post(LOGIN_BASE_URL+'login',credentials);
        }

        discordLogin(){
            return axios.get('/auth/discord');
        }

        signup(credentials){
            return axios.post(LOGIN_BASE_URL+'register',credentials);
        }
}

export default new LoginService()