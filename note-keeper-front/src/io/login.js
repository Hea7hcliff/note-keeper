import axios from 'axios';
// import config from './config';

const config = {
    api_url: 'http://188.166.166.214:8080/api/'
};

const Login = ({ email, password }) => {
    return axios.post(`${config.api_url}login`, { email, password })
        .then((response) => {
            const token = response.data.token;
            return token;
        })
        .catch((error) => {
            console.log(error);
        });
};

export { Login };
