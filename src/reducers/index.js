import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import ConnectionReducer from './ConnectionReducer';
import authReducer from '../containers/Auth/reducer';

const config = {
    key: 'primary',
    storage,
    whitelist: [authReducer],
};

export default persistCombineReducers(config, {
    auth: authReducer
});
