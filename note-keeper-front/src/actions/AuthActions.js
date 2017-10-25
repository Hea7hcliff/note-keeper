import { Actions } from 'react-native-router-flux';
import { 
    GET_TOKEN,
} from './types';

export const getToken = (token) => {
    return (dispatch) => {
        dispatch({
            type: GET_TOKEN,
            payload: token
        });
        Actions.mainStack();
    };
};

