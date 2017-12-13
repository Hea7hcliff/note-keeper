import {
    PRIORITY_CHANGED,
    TITLE_CHANGED,
    DESCRIPTION_CHANGED, 
    RESET_NOTE
} from './types';

export const priorityChanged = priority => {
    return {
        type: PRIORITY_CHANGED,
        payload: priority
    };
};

export const titleChanged = title => {
    return {
        type: TITLE_CHANGED,
        payload: title
    };
};

export const descriptionChanged = description => {
    return {
        type: DESCRIPTION_CHANGED,
        payload: description
    };
};

export const resetNote = () => {
    return {
        type: RESET_NOTE
    };
};
