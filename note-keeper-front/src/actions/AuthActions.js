// import { Actions } from 'react-native-router-flux';
import { 
    REGISTER_TOKEN, 
    USER_LOADED
} from './types';

export const registerToken = (token, navigate) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_TOKEN,
            payload: token
        });
        navigate('Main');
    };
};

export const userLoading = (check) => {
    return {
        type: USER_LOADED,
        payload: check
    };
};
