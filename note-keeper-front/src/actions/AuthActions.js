import { Actions } from 'react-native-router-flux';
import { 
    REGISTER_TOKEN, 
    USER_LOADED
} from './types';

export const registerToken = (token) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_TOKEN,
            payload: token
        });
        Actions.mainStack();
    };
};

export const userLoading = (check) => {
    return {
        type: USER_LOADED,
        payload: check
    };
};
