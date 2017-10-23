import axios from 'axios';
import config from './config';

const Login = ({ email, password }) => {
    return axios.post(`${config.api_url}login`, { email, password })
        .then((response) => {
            const token = response.data.token;
            return token;
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
        });
};

export { Login };
