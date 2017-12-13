import { combineReducers } from 'redux';
import nav from './nav';
import AuthReducer from './AuthReducer';
import DataReducer from './DataReducer';
import UpdateNoteReducer from './UpdateNoteReducer';

export default combineReducers({
    nav,
    auth: AuthReducer,
    data: DataReducer,
    update: UpdateNoteReducer
});
