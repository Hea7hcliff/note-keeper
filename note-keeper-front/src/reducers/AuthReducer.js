import {
    REGISTER_TOKEN, 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    CONFIRM_PASSWORD_CHANGED,  
    USER_LOADING,
    RESET_CREDENTIALS
} from '../actions/types';

const INITIAL_STATE = {
    token: null,
    email: '',
    password: '',
    confirmPassword: '',
    userLoadingStatus: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_TOKEN:
            return { ...state, token: action.payload };
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case CONFIRM_PASSWORD_CHANGED:
            return { ...state, confirmPassword: action.payload };
        case USER_LOADING:
            return { ...state, userLoadingStatus: action.payload };
        case RESET_CREDENTIALS:
            return {
                ...state,
                email: '',
                password: '',
                confirmPassword: ''
            };
        default:
            return state;
    }
};
