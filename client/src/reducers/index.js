import {combineReducers} from 'redux';
import Categories from './categories';
import Products from './products';
import ProductsCatId from './productsCatId';



export default combineReducers({
	Categories,
	Products,
	ProductsCatId
});