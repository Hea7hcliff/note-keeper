import axios from 'axios';
import config from './config';

const GetNotes = (token) => {
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`${config.api_url}notes?priority=1`, { headers })
        .then((response) => {
            return response.data;
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

export { GetNotes };
