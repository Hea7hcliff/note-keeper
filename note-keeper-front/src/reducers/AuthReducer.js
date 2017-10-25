import {
    GET_TOKEN 
} from '../actions/types';

const INITIAL_STATE = {
    token: null,
    email: '',
    password: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return { ...state, token: action.payload };
        default: 
            return state;
    }
};
