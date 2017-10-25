import axios from 'axios';

const config = {
    api_url: 'http://188.166.166.214:8080/api/'
};

const Register = ({ email, password, confirmPassword }) => {
    return axios.post(`${config.api_url}register`, { email, password, confirmPassword })
        .then((response) => {
            const token = response.data.token;
            return token;
        })
        .catch((error) => {
            console.log(error);
        });
};

export { Register };
