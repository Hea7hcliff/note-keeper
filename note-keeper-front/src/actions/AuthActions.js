import { 
    REGISTER_TOKEN, 
    USER_LOADING,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    CONFIRM_PASSWORD_CHANGED,
    RESET_CREDENTIALS
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

export const emailChanged = email => {
    return {
        type: EMAIL_CHANGED,
        payload: email
    };
};

export const passwordChanged = password => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    };
};

export const confirmPAsswordChanged = confirmPassword => {
    return {
        type: CONFIRM_PASSWORD_CHANGED,
        payload: confirmPassword
    };
};

export const userLoading = loading => {
    return {
        type: USER_LOADING,
        payload: loading
    };
};

export const resetCredentials = () => {
    return {
        type: RESET_CREDENTIALS
    };
};
