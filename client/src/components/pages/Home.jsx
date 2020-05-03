import React, {Component} from 'react';
import {Container} from '@material-ui/core';

import Banner from './../pages-components/Banner';
import ListPopular from './../pages-components/ListPopulars';
import ListProducts from './../pages-components/ListProducts';
import SceletLoader from './../pages-components/SceletPreload';
class Home extends Component{

	constructor(props){
		super(props);
		this.state = {
			products: [],
			popularProd: []
		}
	}

	componentDidUpdate(prevProps){
		if(prevProps.products!==this.props.products){
			this.productUpd(this.props.products);
		}
	}

	productUpd(prod){
		this.setState({products: prod.slice(0, 4),
				popularProd: prod.filter(item=>item.rating===5).slice(0,6)});
	}

	componentDidMount(){
		if(this.state.products.length===0&&this.props.products.length>0){
			this.productUpd(this.props.products);
		}
	}

	
	render(){
		
		return(
			<>
			<Banner />
			<Container maxWidth="lg">
				<ListPopular products={this.state.popularProd} />
				{this.state.products.length>0&&(<ListProducts title={'Новинки'} descr={'Только горячие новинки нашего магазина'} products={this.state.products} match={this.props.match} btn={true}/>)}
				{this.state.products.length===0 && (<SceletLoader type={'listProducts4'} />)}
			</Container>
			</>
		)
	}
}

export default Home;