import {combineReducers, configureStore} from "@reduxjs/toolkit";
import appStateSlice from "./reducers/appState";
import globalLoadingSlice from "./reducers/globalLoading";
import themeModeSlice from "./reducers/themeMode";
import userSlice from "./reducers/userState";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user: userSlice,
    themeMode: themeModeSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice
})
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export default store;