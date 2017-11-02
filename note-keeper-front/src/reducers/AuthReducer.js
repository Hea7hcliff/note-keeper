import {
    REGISTER_TOKEN, 
    USER_LOADED
} from '../actions/types';

const INITIAL_STATE = {
    token: null,
    email: '',
    password: '',
    userLoaded: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_TOKEN:
            return { ...state, token: action.payload };
        case USER_LOADED:
            return { ...state, userLoaded: action.payload };
        default: 
            return state;
    }
};
