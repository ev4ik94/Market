import React, {useState, useEffect} from 'react';
import {getCookie, setCookie, costRepl} from './../pages-components/Wigets/SecondaryFunc.js';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Card, CardMedia, Typography, CardContent, ButtonGroup, Button, Container} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles  = makeStyles({

	root: {
		height:'160px',
		
	},
	
})

export default function Cart({match}){

	const [products, getProducts] = useState(null);
	const [type, setType] = useState(match.params.slug)
	

	useEffect(()=>{
		if(products===null&&type==='cart'){
			getProducts(getCookie('cart')?getCookie('cart'):[]);
		}else if(products===null&&type==='favorite'){
			getProducts(getCookie('favorite')?getCookie('favorite'):[]);
		}

		if(type!==match.params.slug){
			setType(match.params.slug);
		}
	})

	const deleteProd = (id)=>{
		let newArr = [];
		for(var k=0; k<products.length; k++){
			if(products[k].id!==id){
				newArr.push(products[k])
			}
		}
		setCookie('cart', newArr);
		window.location.reload();
	}

	return(
		<Container className="container">
			<h2 className="font-weight-bold text-color-grey text-center">{type==='cart'?'Корзина':'Список понравившихся'}</h2>
			
			<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
          			<TableRow>
            			<TableCell  align="center">id</TableCell>
            			<TableCell align="center">Picture</TableCell>
            			<TableCell align="center">Name</TableCell>
            			<TableCell align="center">Cost</TableCell>
            			<TableCell align="center"></TableCell>
       
          			</TableRow>
        		</TableHead>
        		<TableBody>
          {(products!==null && products.length>0) && (<>{products.map((row) => (
            <TableRow key={row.id}>
            <TableCell align="center">{row.id}</TableCell>
            <TableCell align="center"><div style={{width:'100px', margin:'0 auto'}}><img src={row.img} alt="" className="img-contain"/></div></TableCell>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>

              <TableCell align="center">{costRepl(row.cost)} сум</TableCell>
              <TableCell align="center"><Button onClick={(id)=>deleteProd(row.id)} color="secondary">delete</Button></TableCell>
         
            </TableRow>
          ))}</>)}

          
        </TableBody>
        		</Table>
			</TableContainer>
				{products!==null&&products.length===0 && (<p className="text-center font-weight" style={{marginTop:'20px'}}>{type==='cart'?'Корзина пуста':'Список пуст!'}</p>)}
		</Container>
	)
}