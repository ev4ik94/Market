import React, {Component} from 'react';

import ButtonAppBar from './Menu';
import BotMenuCategory from './MenuCategories';

class Header extends Component{

	constructor(props){
		super(props);
		this.state = {
			categories: []
		}
	}

	componentDidUpdate(prevProps){
		if(prevProps.categories!==this.props.categories){
			this.setState({categories: this.props.categories})
		}
	}

	render(){
		return(
			<>
			<ButtonAppBar categories={this.state.categories}/>
			<BotMenuCategory categories={this.state.categories}/>
			</>
		)
	}
}

export default Header;