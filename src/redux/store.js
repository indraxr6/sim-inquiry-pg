import { applyMiddleware, combineReducers, createStore } from 'redux'
// import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import payment from './payment/reducer'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['payment'],
};

const rootReducer = combineReducers({
    payment,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (state, action) => {
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return { store, persistor };
};