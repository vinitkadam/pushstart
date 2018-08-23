import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import ConnectionReducer from './ConnectionReducer';
import TempReducer from './TempReducer';

const config = {
    key: 'primary',
    storage,
    whitelist: [],
};

export default persistCombineReducers(config, {
    tempReducer: TempReducer
});