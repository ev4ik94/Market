import React, {Component} from 'react';

import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import {productsAll, productsCatId, getCategories} from './action/actions.js'
import Main from './Main';
import Header from './components/pages-components/Header';
import Footer from './components/pages-components/Footer';

class App extends Component {

  constructor(props){

    super(props);

    props.getProducts();
    props.getCategories();

  }

  

  render(){
    return (
    <div className="App">
      <BrowserRouter>
        <Header categories={this.props.categories}/>
        
        <Main 
        productsAll={this.props.products}
        getProducts={this.props.getProductsId}
        productsCatId={this.props.productsCatId}
        categories={this.props.categories}
        />
       
        <Footer categories={this.props.categories}/>
      </BrowserRouter>
    </div>
  )
  }
}

export default connect (
    state=>({
        products: state.Products,
        productsCatId: state.ProductsCatId,
        categories: state.Categories
    }),
    dispatch=>({
      getProducts: ()=>{
        dispatch(productsAll())
      },
      getProductsId: (catId)=>{
        dispatch(productsCatId(catId))
      },
      getCategories: ()=>{
        dispatch(getCategories())
      }
    })
)(App);
