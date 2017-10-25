import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { 
    GET_NOTES
} from './types';

const config = {
    api_url: 'http://188.166.166.214:8080/api/'
};

export const getNotes = (token) => {
    const headers = { Authorization: `Bearer ${token}` };
    return (dispatch) => {
        axios.get(`${config.api_url}notes?priority=1`, { headers })
            .then((response) => {
                dispatch({ type: GET_NOTES, payload: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const getDones = (token) => {
    const headers = { Authorization: `Bearer ${token}` };
    return (dispatch) => {
        axios.get(`${config.api_url}notes`, { headers })
            .then((response) => {
                dispatch({ type: GET_NOTES, payload: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const doneNote = (data) => {
    const { token } = data;
    const { title, description, priority, _id } = data.note;

    const headers = { Authorization: `Bearer ${token}` };
    return (dispatch) => {
        axios.put(`${config.api_url}update/${_id}`, { title, description, priority, done: true }, { headers })
        .then(() => {
            dispatch(getNotes(token));
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

export const addNote = (data) => {
    const { token, title, description, priority } = data;

    const headers = { Authorization: `Bearer ${token}` };
    return (dispatch) => {
        axios.post(`${config.api_url}add`, { title, description, priority }, { headers })
        .then(() => {
            dispatch(getNotes(token));
            Actions.mainStack();
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

export const deleteNote = (data) => {
    const { token } = data;
    const { _id } = data.note;
    console.log(_id, token);

    const headers = { Authorization: `Bearer ${token}` };
    return (dispatch) => {
        axios.delete(`${config.api_url}delete/${_id}`, { headers })
        .then(() => {
            dispatch(getNotes(token));
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

