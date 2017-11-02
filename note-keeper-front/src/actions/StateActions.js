import {
    DATA_LOADED
} from './types';

export const dataLoading = (check) => {
    return {
        type: DATA_LOADED,
        payload: check
    };
};
