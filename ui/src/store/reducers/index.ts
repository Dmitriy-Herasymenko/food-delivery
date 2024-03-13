import {combineReducers} from "redux";
import usersReducer from "./users/reducers";
import messagesReducer from "./messages/reducers";

export const rootReducer = combineReducers({
    usersReducer,
    messagesReducer
});

export type RootState = ReturnType<typeof rootReducer>