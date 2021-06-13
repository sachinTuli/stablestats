import axios from 'axios';
const LOGIN_BASE_URL="http://localhost:3001/auth/";

class LoginService
{
        login(credentials){
            return axios.post(LOGIN_BASE_URL+'login',credentials);
        }
}

export default new LoginService()