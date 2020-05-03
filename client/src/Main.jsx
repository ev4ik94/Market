import React, {Component} from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import CategoriesList from './components/pages/CategoriesList';
import Cart from './components/pages/Cart';

class Main extends Component{

	constructor(props){
		super(props);

		this.state = {
			categories: [],
			products: []
		};
	}

	componentDidUpdate(prevProps){

		if(prevProps.categories!==this.props.categories){
			this.setState({categories:this.props.categories})
		}

		if(prevProps.productsAll!==this.props.productsAll){
			this.setState({products: this.props.productsAll});
		}
		
	}

	render(){
		return(
			<Switch>
				
				<Route path={'/:slug/:slug/:id'} render={(match)=><Products match={match} getProducts={this.props.getProducts} products={this.props.productsCatId}/>} />
				<Route path={'/cart/:slug'} render={(match)=><Cart match={match.match}/>} />
				<Route path={'/:MainSlug/:slug'} render={(match)=><CategoriesList match={match} categories={this.state.categories}/>} />
				<Route path={'/'} render={(match)=><Home match={match} products={this.state.products} />} />
				
			</Switch>
		)
	}
}

export default Main;

