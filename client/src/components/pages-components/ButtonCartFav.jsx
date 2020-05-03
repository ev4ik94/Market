import React, {useState} from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {Link} from "react-router-dom";
import {getCookie} from './Wigets/SecondaryFunc.js';
import {Button,  Badge, Grid} from '@material-ui/core';



export default function Buttons({position, xs}){

	const [cartVal, setCart] = useState(getCookie('cart')?getCookie('cart').length:0);
  const [fovarVal, setFavor] = useState(getCookie('favorite')?getCookie('favorite').length:0);


  	return(
      
  		<Grid container spacing={1} justify={position}>
            <Grid item xs={xs}>
              <Button color="inherit" className="icons-menu-tools"><SearchIcon /></Button>
            </Grid>
            <Grid item xs={xs} className="position-relative">
            <Link to={'/cart/favorite'}><Button color="inherit" className="icons-menu-tools">
              <Badge badgeContent={fovarVal} color="primary">
                <FavoriteBorderIcon />
              </Badge>
            </Button></Link>

           
            </Grid>
            <Grid item xs={xs} className="position-relative">
            <Link to={'/cart/cart'}><Button color="inherit" className="icons-menu-tools">
              <Badge badgeContent={cartVal} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Button></Link>
             
            
            </Grid>
         </Grid>
  	)

}