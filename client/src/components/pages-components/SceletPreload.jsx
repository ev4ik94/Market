import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {Grid, Box  } from '@material-ui/core';

export default function SceletLoader(type){

	return(

		<>
			{type.type==='pageView' && (
				<>
				<Grid container>
					<Grid item lg={6} md={6} xs={12}>
						<Skeleton variant="rect" width={350} height={300} style={{margin:'0 auto'}}/>
					</Grid>

					<Grid item lg={6} md={6} xs={12}>
						 <Skeleton variant="text" height={40}/>
						  <Skeleton variant="text" height={40}/>
						  <Skeleton variant="text" height={40}/>
						  <Skeleton variant="text" height={40}/>
					</Grid>
				</Grid>
				</>
			)}

			{type.type==='listProducts' && (
				<>
				 <Grid container wrap="wrap" justify="space-around">
      
        		{Array.from(new Array(8)).map((item,index)=>(
        			<Box key={index} width={210} marginRight={0.5} my={5}>
            		<Box pt={0.5}>
              			<Skeleton variant="rect"height={150}/>
              			<Skeleton width="100%" />
              			<Skeleton width="60%" />
            		</Box>
        		</Box>

        			))}
        		
      
    			</Grid>
				</>
			)}

			{type.type==='listProducts4' && (
				<>
				 <Grid container wrap="wrap" justify="space-around">
      
        		{Array.from(new Array(4)).map((item,index)=>(
        			<Grid item md={3}  xs={12} sm={6} key={index}>
        			<div  style={{width:'90%', margin:'10px auto'}}>
            		<Box pt={0.5}>
              			<Skeleton variant="rect"height={150}/>
              			<Skeleton width="100%" />
              			<Skeleton width="60%" />
            		</Box>
        		</div>
        		</Grid>

        			))}
        		
      
    			</Grid>
				</>
			)}
		</>
	)
}