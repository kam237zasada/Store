import { combineReducers } from 'redux';
import userReducer from './userReducer';
import fetchBuyDocs from './fetchBuyDocs';
import buyDocReducer from './buyDocReducer';
import fetchSellers from './fetchSellers';
import sellerReducer from './sellerReducer';
import fetchBrands from './fetchBrands';
import brandReducer from './brandReducer';
import fetchProducts from './fetchProducts';
import fetchSells from './fetchSells';
import sellReducer from './sellReducer';
import productReducer from './productReducer';

export default combineReducers({
    user: userReducer,
    buyDocs: fetchBuyDocs,
    buyDoc: buyDocReducer,
    sellers: fetchSellers,
    seller: sellerReducer,
    brands: fetchBrands,
    brand: brandReducer,
    products: fetchProducts,
    sells: fetchSells, 
    sell: sellReducer,
    product: productReducer

});