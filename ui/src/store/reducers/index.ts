import {combineReducers} from 'redux';
import messagesReducer from './messages/reducers';
import userReducer from './user/reducers';

export const rootReducer = combineReducers({
    messagesReducer,
    userReducer
});

export type RootState = ReturnType<typeof rootReducer>