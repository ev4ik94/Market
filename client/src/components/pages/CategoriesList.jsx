import React, {Component} from 'react';
import {Grid, Typography, Button, Container} from '@material-ui/core';
import {Link} from "react-router-dom";



export default class CategoriesList extends Component{

	constructor(props){
		super(props);
		
		this.state = {
			currentCat: props.match.match.params.slug?props.match.match.params.slug:'',
			catArr: [],
			mainSlug: props.match.match.params.MainSlug?props.match.match.params.MainSlug:'',
			title: '',
			categories: []
		};

	}

	componentDidUpdate(prevProps){
		
		if(prevProps.match.match.params.slug!==this.props.match.match.params.slug){
			this.setState({currentCat:this.props.match.match.params.slug});
			setTimeout(()=>this.getArrCat(this.props.categories),300);
		}

		if(prevProps.match.match.params.MainSlug!==this.props.match.match.params.MainSlug){
			this.setState({mainSlug:this.props.match.match.params.MainSlug});
			setTimeout(()=>this.getArrCat(this.props.categories),300);
		}

		if(prevProps.categories!==this.props.categories){
			this.getArrCat(this.props.categories);
		}

		


	}

	componentDidMount(){
		
		if(this.state.categories.length===0&&this.props.categories.children){
			this.getArrCat(this.props.categories);
		}
	}

	getArrCat(categories){
		
		let childArr = this.state.mainSlug!==''?(categories.children || []).filter(item=>item.slug===this.state.mainSlug):null;
		let cat = this.state.currentCat!==''?(childArr[0].children || []).filter(item=>item.slug===this.state.currentCat):null;
		
		this.setState({title: childArr.length>0?childArr[0].title:'',
						categories: cat[0]});
	}


	render(){
		
	return(
		
			<Container className="container">
			<Typography gutterBottom variant="h3" component="h1" className="text-color-grey text-center">{this.state.title}</Typography>
			
			<Grid container justify="space-around" style={{marginTop:'30px'}}>
				{
					(this.state.categories.children || []).map(item=>{

						return(
							<Link to={`/${this.state.mainSlug}/${this.state.currentCat}/${item.id}`} key={item.id}>
							<Button variant="outlined" color="primary" style={{margin:'10px'}}>
  								{item.title}
							</Button>
						</Link>
						)
					})
				}
			</Grid>
			</Container>
		
	)
	}
}


	
	
	
	