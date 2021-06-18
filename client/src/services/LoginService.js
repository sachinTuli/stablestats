import axios from 'axios';
// const LOGIN_BASE_URL="/auth/";
const LOGIN_BASE_URL="http://localhost:3001/auth/";
const USER_BASE_URL="http://localhost:3001/user/";
class LoginService
{
    /// FOR HEROKU
        // login(credentials){
        //     return axios.post('/auth/login',credentials);
        // }

        // discordLogin(){
        //     return axios.get('/auth/discord');
        // }

        // signup(credentials){
        //     return axios.post('/auth/register',credentials);
        // }

        // getCurruntUser() {
        //     return axios.get('/user/curruntUser');
        // }

//FOR LOCAL ON SEPERATE PORTS
        login(credentials){
            return axios.post(LOGIN_BASE_URL+'login',credentials);
        }

        discordLogin(){
            return axios.get(LOGIN_BASE_URL+'discord');
        }

        signup(credentials){
            return axios.post(LOGIN_BASE_URL+'register',credentials);
        }

        getCurruntUser() {
            return axios.get(USER_BASE_URL+'/curruntUser');
        }
}

export default new LoginService()