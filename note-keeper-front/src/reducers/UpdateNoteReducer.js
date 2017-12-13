import {
    PRIORITY_CHANGED,
    TITLE_CHANGED,
    DESCRIPTION_CHANGED, 
    GET_NOTE,
    RESET_NOTE
} from '../actions/types';

const INITIAL_STATE = {
    priority: 3,
    title: '',
    description: '',
    _id: null,
    dueDate: null,
    list: [{
        name: ''
    }]
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRIORITY_CHANGED:
            return { ...state, priority: action.payload };
        case TITLE_CHANGED:
            return { ...state, title: action.payload };
        case DESCRIPTION_CHANGED:
            return { ...state, description: action.payload };
        case GET_NOTE:
            return { ...state, ...action.payload };
        case RESET_NOTE:
            return INITIAL_STATE;
        default: 
            return state;
    }
};
