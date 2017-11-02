import {
    GET_NOTES
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_NOTES:
            return action.payload;
        default: 
            return state;
    }
};
