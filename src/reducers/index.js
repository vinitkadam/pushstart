import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import ConnectionReducer from './ConnectionReducer';
import authReducer from '../containers/Auth/reducer';
import interestsReducer from '../containers/Interests/reducer';

const config = {
    key: 'primary',
    storage,
    whitelist: ['auth', 'interestsReducer'],
};

export default persistCombineReducers(config, {
    auth: authReducer,
    interests: interestsReducer
});
