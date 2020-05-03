import React, {Component} from 'react';
import {Grid, Typography, Button, Container, Paper, Tabs, Tab, Box} from '@material-ui/core';

import './../css/Products.css';
import ListProducts from './../pages-components/ListProducts';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import {costRepl, setCookie, getCookie} from './../pages-components/Wigets/SecondaryFunc.js';
import Sceletloader from './../pages-components/SceletPreload';
import LazyImage from './../pages-components/Wigets/LazyLoadImg';
import Alert from '@material-ui/lab/Alert';


export default class Products extends Component{
	constructor(props){
		super(props);
		this.state = {
			id: props.match.match.params.id?(!isNaN(props.match.match.params.id)?props.match.match.params.id:false):false,
			catId: props.match.match.params.slug?(!isNaN(props.match.match.params.slug)?props.match.match.params.slug:false):false,
			products: null
		};

		this._Mounted = true;
		
	}

	componentDidUpdate(prevProps, prevState){

		if(prevProps.match.match.params.slug!==this.props.match.match.params.slug){
			this.setState({catId:!isNaN(this.props.match.match.params.slug)?this.props.match.match.params.slug:false})
			setTimeout(()=>this.getProd(),300);
		}

		if(prevProps.match.match.params.id!==this.props.match.match.params.id){
			this.setState({id:!isNaN(this.props.match.match.params.id)?this.props.match.match.params.id:false})
			setTimeout(()=>this.getProd(),300);
		}

		if(prevProps.products!==this.props.products){
			this.setState({products:this.props.products});
		}

		if(this.state.products===null){
			this.getProd();
			
		}
	
	
	}

	getProd(){
		
		if(!this.state.catId){
			this.props.getProducts(this.state.id);
		}

		if(this.state.catId){
			this.props.getProducts(this.state.catId);
		}
	}

	componentDidMount(){
		if(this.state.products===null&&this._Mounted){
			this._Mounted = false;
			this.getProd();
		}
	}

	

	render(){
		
		return(
			<>
			{(this.state.id&&this.state.catId) && <ProductsView products={this.state.products!==null?this.state.products:[]} match={this.props.match.match}/>}
			{(this.state.id&&!this.state.catId) && <ProductsList match={this.props.match.match} products={this.state.products!==null?this.state.products:[]}/>}
			</>
		)
	}
}



class ProductsList extends Component{

	constructor(props){

		super(props);

		this.state = {
			products: []
		};
		
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.products!==this.props.products&&this.state.products.length!==this.props.products.length){
			this.setState({products:this.props.products});
		}

		
	}
 
	render(){
		
		return(
			<Container className="container">
				{(this.state.products.length>0) &&(<ListProducts products={this.state.products!==null?this.state.products:[]} match={this.props.match}/>)}
				{(this.state.products.length===0) &&(<p className="text-center">Список пуст</p>)}
			</Container>
		)
	}
}




class ProductsView extends Component{

	constructor(props){
		super(props);

		this.state = {
			products: [],
			productView: null,
			descrip: true,
			character: false,
			value: 1,
			addProduct: false
		}

		this.tabs = this.tabs.bind(this);
	}

	componentDidUpdate(prevProps){
		
		if(prevProps.products!== this.props.products){
			
			this.setState({products: this.props.products});
			setTimeout(()=>this.getProductView(this.props.match.params.id),300);
		}

		if(prevProps.match.params.id!== this.props.match.params.id){
			
			this.getProductView(this.props.match.params.id);
		}

		if(prevProps.match.params.Catid!== this.props.match.params.Catid){
			
			this.getProductView(this.props.match.params.id);
		}
		

	}

	getProductView(id){
		var product = this.state.products.filter(item=>item.id===Number(id));
		this.setState({productView: product.length>0?product:null});
		
	}

	tabs(event, newValue){
		this.setState({value: newValue})
	}

	componentDidMount(){
		if(this.state.productView===null&&this.props.products.length>0){
			this.setState({products:this.props.products});
			setTimeout(()=>this.getProductView(this.props.match.params.id),300);
			
		}
		
	}

	addToCart (id, title, cost, img){
		let arr = [];
		let getProd = getCookie('cart');

	if(!this.state.addProduct){
		this.setState({addProduct:true});
		if(getProd){
			getProd.push({id: id, title:title, cost:cost, img:img});
			setCookie('cart', getProd);
		}else{

			arr.push({id: id, title:title, cost:cost, img:img});
			setCookie('cart', arr);
		}
	}
		
		
	}

	render(){



		return(
			<Container className="container">
			<Alert severity="success" className={this.state.addProduct?'show-alert':'hide-alert'}>Продукт добавлен в корзину!</Alert>
			{this.state.productView!==null && (<>
				<div className="product-view-description">
					<Grid container>
						<Grid item lg={6} md={6} sm={12}>
							<Paper elevation={3} className="card-img">
								<LazyImage image={{srcMain:this.state.productView[0].images.large,
                              srcDef: this.state.productView[0].images.small,
                              title: this.state.productView[0].title}} />
							</Paper>
						</Grid>

						<Grid  item lg={6} md={6} sm={12}>
							<Typography variant="h5" component="h4" className="text-color-grey" style={{padding:'10px 0px'}}>{this.state.productView[0].title}</Typography>
							<Grid container>
							<Grid item>
        					<Rating
          						name="customized-empty"
          						value={this.state.productView[0].rating}
          						className="text-color-blue"
          						style={{fontSize:'1.1rem', paddingTop:'2px'}}
          						readOnly
          						emptyIcon={<StarBorderIcon fontSize="inherit" />}
        					/>
        					</Grid>
        					<Grid item xs={2}><p style={{padding:'0px', margin:'0px'}}>({this.state.productView[0].rating})</p></Grid>
        					</Grid>

        					<Typography variant="h5" component="p" className="text-color-blue" style={{fontWeight:'600', padding:'10px 0px'}}>
        						{costRepl(this.state.productView[0].cost)} сум
        					</Typography>

        					<Button variant="contained" color="primary" className="w-50" onClick={(id, title, cost, img)=>this.addToCart(this.state.productView[0].id,this.state.productView[0].title,this.state.productView[0].cost,this.state.productView[0].images.small)}>Add to Cart</Button>
        				</Grid>
						
					</Grid>
				</div>

				<div className="product-view-character" style={{padding:'30px'}}>
					
					<Tabs
        				value={this.state.value}
        				indicatorColor="primary"
        				textColor="primary"
        				onChange={this.tabs}
        				aria-label="disabled tabs example"
        				style={{backgroundColor:'#efefef', fontWeight:'600'}}
      					>
        				<Tab label="Описание" value={1}/>
        				<Tab label="Характеристики" value={2}/>
      				</Tabs>
      				<Box p={1.5}>
      					{this.state.value===1&& (
      					this.state.products[0].description
      					)}

      				{this.state.value===2&& (
      					<div className="list-character" dangerouslySetInnerHTML=
						{{__html: this.state.products[0].characters}}></div>
      					)}	
      				</Box>
      				
					
				</div>
			</>)}

			{this.state.productView===null && (<Sceletloader type={'pageView'} />)}
			
			</Container>
		)
	}
}


