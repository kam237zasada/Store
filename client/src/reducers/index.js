import { combineReducers } from 'redux';
import userReducer from './userReducer';
import fetchBuyDocs from './fetchBuyDocs';
import buyDocReducer from './buyDocReducer';

export default combineReducers({
    user: userReducer,
    buyDocs: fetchBuyDocs,
    buyDoc: buyDocReducer
});