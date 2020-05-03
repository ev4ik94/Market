import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Card, CardMedia, Typography, CardContent, ButtonGroup, Button} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {Link} from "react-router-dom";
import LazyImage from './Wigets/LazyLoadImg';
import {PopularImg} from './../Objects/Data.js';
import {costRepl, textEllipsis, setCookie, getCookie} from './Wigets/SecondaryFunc.js';

const useStyles  = makeStyles({

	media: {
		height:'160px',
		width:'95%',
		margin:'0 auto',
		overflow: 'hidden',
		position:'relative'
	},
	icons: {
		width:'20px',
		height:'20px'
	},
	buttonIcons: {minWidth:'30px'},

	styleText:{
		fontWeight:'600',
		fontSize:'1.1rem',
		marginTop:'5px',
		marginBottom:'5px'
	}
})


export default function ListProducts({products=[], title="", descr="", btn=false, match}){
	const classes = useStyles();
	const arrProd = PopularImg.filter((item,index)=>index<=7);

	const addToCart = (id, title, cost, img, type)=>{
		let arr = [];
		let getProd = getCookie(type);
		if(getProd){
			getProd.push({id: id, title:title, cost:cost, img:img});
			setCookie(type, getProd);
		}else{

			arr.push({id: id, title:title, cost:cost, img:img});
			setCookie(type, arr);
		}
		
		
	}

	
	return(
		<div style={{marginTop:'40px', paddingBottom:'20px'}}>
		
		<Typography gutterBottom variant="h4" component="h1" className="text-color-grey">{title}</Typography>
		<p className="text-color-grey">{descr}</p>
		<Grid container spacing={2} style={{marginBottom:'15px'}}>
			{products.map((item,index)=>(
				<Grid item md={3}  xs={12} sm={6} key={index}>
				<Card className="card-products" style={{height:'100%'}}>
					
					<Link to={`/products/${item.catId}/${item.id}`}>
						<div className={classes.media}>
						<LazyImage image={{srcMain:item.images.large,
                              srcDef: item.images.small,
                              title: item.title}} />
							
						</div>
					</Link>
        			<CardContent>
        			
        			 <ButtonGroup variant="text">
            			<Button color="inherit" className={`${classes.buttonIcons} icons-menu-tools`} style={{padding:'5px 5px 5px 0px'}} onClick={()=>addToCart(item.id,item.title,item.cost, item.images.small, 'favorite')}><FavoriteBorderIcon className={classes.icons}/></Button>
            			<Button color="inherit" className={`${classes.buttonIcons} icons-menu-tools`} style={{padding:'5px'}} onClick={()=>addToCart(item.id,item.title,item.cost, item.images.small, 'cart')}><ShoppingCartIcon className={classes.icons}/></Button>
          			</ButtonGroup>
          			<Link to={`/products/${item.catId}/${item.id}`} className="nav-link text-color-grey product-link-title">
          				<Typography gutterBottom variant="h6" component="p" style={{lineHeight:'1.2', fontSize:'1.1rem'}}>
            				{textEllipsis(item.title, 25)}
          				</Typography>
          			</Link>
          			<Typography variant="body2" color="textSecondary" component="p">
            			{textEllipsis(item.description, 65)}
          			</Typography>
          			<Typography component="p" className={`${classes.styleText} text-color-blue`}>{costRepl(item.cost)} сум</Typography>
        			<Grid container>
        			<Grid item lg={5} md={6} xs={5} sm={5}>
        			<Rating
          				name="customized-empty"
          				value={item.rating}
          				className="text-color-blue"
          				style={{fontSize:'1.1rem', paddingTop:'2px'}}
          				readOnly
          				emptyIcon={<StarBorderIcon fontSize="inherit" />}
        			/></Grid>
        			<Grid item xs={2}><p style={{padding:'0px', margin:'0px'}}>({item.rating})</p></Grid>
        			</Grid>
        			
        			</CardContent>
        			
				</Card>
			</Grid>
			))}
		</Grid>

		{btn && (
			<Button variant="outlined" color="primary" className="m-aut d-block">Смотерть больше</Button>
		)}

		</div>
	)
}