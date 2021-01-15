import { combineReducers } from 'redux';
import userReducer from './userReducer';
import fetchBuyDocs from './fetchBuyDocs';
import buyDocReducer from './buyDocReducer';
import fetchSellers from './fetchSellers';
import sellerReducer from './sellerReducer';
import fetchBrands from './fetchBrands';
import brandReducer from './brandReducer';
import fetchProducts from './fetchProducts';

export default combineReducers({
    user: userReducer,
    buyDocs: fetchBuyDocs,
    buyDoc: buyDocReducer,
    sellers: fetchSellers,
    seller: sellerReducer,
    brands: fetchBrands,
    brand: brandReducer,
    products: fetchProducts
});