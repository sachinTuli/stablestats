import axios from 'axios';
const LOGIN_BASE_URL="";

class LoginService
{
        login(credentials){
            return axios.post('/auth/login',credentials);
        }

        discordLogin(){
            return axios.get('/auth/discord');
        }

        signup(credentials){
            return axios.post('/auth/register',credentials);
        }

        getCurruntUser() {
            return axios.get('/user/curruntUser');
        }
}

export default new LoginService()