import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import {
    GET_NOTES,
    GET_NOTE
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
    const { title, description, priority, _id, list, dueDate } = data.note;
    const headers = { Authorization: `Bearer ${token}` };

    return (dispatch) => {
        axios.put(`${config.api_url}update/${_id}`, {
            title,
            description,
            priority,
            done: true,
            list,
            dueDate
        }, { headers })
            .then(() => {
                dispatch(getNotes(token));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const undoNote = (data) => {
    const { token } = data;
    const { title, description, priority, list, _id, dueDate } = data.note;
    const headers = { Authorization: `Bearer ${token}` };

    return (dispatch) => {
        axios.put(`${config.api_url}update/${_id}`, {
            title,
            description,
            priority,
            done: false,
            list,
            dueDate
        }, { headers })
            .then(() => {
                dispatch(getNotes(token));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const addNote = (data, navigation) => {
    const { token, title, description, priority, list, dueDate } = data;
    const headers = { Authorization: `Bearer ${token}` };

    return (dispatch) => {
        axios.post(`${config.api_url}add`, { 
            title, 
            description, 
            priority, 
            list, 
            dueDate 
        }, { headers })
            .then(() => {
                dispatch(getNotes(token));
                navigation.navigate('Main');
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const getNote = (data) => {
    const { _id, token } = data;
    const headers = { Authorization: `Bearer ${token}` };

    return (dispatch) => {
        axios.get(`${config.api_url}notes/${_id}`, { headers })
            .then((response) => {
                dispatch({ type: GET_NOTE, payload: response.data[0] });
            }).then(() => {
                dispatch(NavigationActions.navigate({ routeName: 'Note' }));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const updateNote = (data, navigation) => {
    const { token, title, description, priority, list, _id, dueDate } = data;
    const headers = { Authorization: `Bearer ${token}` };

    return (dispatch) => {
        axios.put(`${config.api_url}update/${_id}`, {
            title,
            description,
            priority,
            list, 
            dueDate
        }, { headers })
            .then(() => {
                dispatch(getNotes(token));
                if (navigation !== null) {
                    navigation.navigate('Main');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const deleteNote = (data) => {
    const { token } = data;
    const { _id } = data.note;
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

