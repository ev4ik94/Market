import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Typography, Button} from '@material-ui/core';
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },

  containerText:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0',
    right: 0,
    top: '0',
  },
  backgroundGrey: {backgroundColor:'rgba(55, 52, 53, .7)'},
   backgroundBlue: {backgroundColor:'rgba(61, 152, 212, .7)'},
  boxText:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    right: '0',
    bottom: '0'
   
  },
   leftBox:{
    padding:'10px',
    paddingTop:'50px',
    background: 'rgba(231, 245, 255,1)'
  
   }
}));

export default function ListPopular({products}){

  const [productsArr, setProd] = useState([]);
  const classes = useStyles();

   useEffect(()=>{
    if(products.length>0&&productsArr.length===0){
      setProd(products);
    }
  })
   

	return(
		<Grid  container spacing={0} style={{height:'300px'}}>
			     <Grid item lg={6} md={6} xs={12} className={`${classes.leftBox} popular-prod`} style={{height:'100%'}}>
              <div>
                <Typography variant="h4" component="h1" className="text-color-grey text-center" style={{paddingBottom:'5px', fontWeight:'600'}}>Популярные Товары</Typography>
                <Typography variant="h6" component="p" className="text-color-grey text-center" style={{paddingBottom:'10px'}}>Здесь собранные самые востребованные товара нашего магазина</Typography>
              </div>
              <Link to={'/products'}>
                <Button variant="outlined" color="primary" className="m-aut d-block">Смотерть больше</Button>
              </Link>
          	</Grid>
          
          
          	{productsArr.length>0&&(
              <Grid item xs={6} style={{position:'relative', height:'100%'}} className="d-none d-lg-block">
              <Grid container spacing={0} style={{height:'50%'}}>
              <Grid item xs={6} style={{position:'relative', height:'100%'}}>
              <div className={`${classes.containerText} wrap-cont`} style={{backgroundColor:'rgba(61, 152, 212, .7)'}}>
                <div className={classes.boxText}></div>
              </div>
              <img src={productsArr[0].images.small} alt={productsArr[0].title} className='img-contain'/>
              </Grid>

              <Grid item xs={6} style={{position:'relative', height:'100%'}}>
              <div className={`${classes.containerText} wrap-cont`} style={{backgroundColor:'rgba(55, 52, 53, .7)'}}>
                <div className={classes.boxText}></div>
              </div>
              <img src={productsArr[1].images.small} alt={productsArr[1].title} className='img-contain'/>
              </Grid>
            </Grid>
            <Grid container spacing={0} style={{height:'50%'}}>
              <Grid item xs={4} style={{position:'relative', height:'100%'}}>
                <div className={`${classes.containerText} wrap-cont`} style={{backgroundColor:'rgba(61, 152, 212, .7)'}}>
                <div className={classes.boxText}></div>
              </div>
              <img src={productsArr[2].images.small} alt={productsArr[2].title} className='img-contain'/>
              </Grid>
              <Grid item xs={4} style={{position:'relative', height:'100%'}}>
                <div className={`${classes.containerText} wrap-cont`} style={{backgroundColor:'rgba(55, 52, 53, .7)'}}>
                <div className={classes.boxText}></div>
              </div>
              <img src={productsArr[3].images.small} alt={productsArr[3].title} className='img-contain'/>
              </Grid>
              <Grid item xs={4} style={{position:'relative', height:'100%'}}>
                <div className={`${classes.containerText} wrap-cont`} style={{backgroundColor:'rgba(61, 152, 212, .7)'}}>
                <div className={classes.boxText}></div>
              </div>
              <img src={productsArr[4].images.small} alt={productsArr[4].title} className='img-contain'/>
              </Grid>
            </Grid>
            </Grid>
            )}
        
          
      </Grid>
	)
}
