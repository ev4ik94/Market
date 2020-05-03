import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Button, IconButton, 
ButtonGroup, List, ListItem, Container, Grid} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import {Link} from "react-router-dom";

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {scrollTop} from './Wigets/SecondaryFunc.js';


const useStyles = makeStyles({
	botBox:{
		backgroundColor: '#3783b5',
		color: '#fefefe',
		padding:'5px',
		fontSize:'1rem'
	},
	root: {
    flexGrow: 1
  },
})



export default function Footer({categories}){

	const classes = useStyles();
	const [catArr, setCat] = useState([]);

	useEffect(()=>{
		if((categories.children?categories.children.length>0:categories.length>0)&&catArr.length===0){
			setCat(categories.children);
		}
	})

	return(
		<div className="footer-site bg-color-blue">
			<Container>
				<Grid container spacing={3} className="footer-categories">
					<Grid item lg={8} md={8} xs={12}>
						{
							catArr.map(element=>(
								<NestedCategories element={element} key={element.id}/>
							))
						}
					</Grid>
					<Grid item xs={4} className="">
						<Grid container className={`social-list`} justify="flex-end">
            				<Grid item xs={4} md={2} lg={2} sm={3}><InstagramIcon /></Grid>
            				<Grid item xs={4} md={2} lg={2} sm={3}><TwitterIcon /></Grid>
            				<Grid item xs={4} md={2} lg={2} sm={3}><FacebookIcon /></Grid>
          				</Grid>
					</Grid>
				</Grid>
			</Container>
			<div>
			<Typography variant="h6" component="p" className={`${classes.botBox} text-center`}>Online Market</Typography>
			</div>
		</div>
	)
}

function NestedCategories({element}){

    const classes = useStyles();

    const nestedCat = (element.children || []).map(item => {

      let url = `/${element.slug}/${item.slug}`;
       return(
        <Link to={url} key={item.id} className="text-color-grey" onClick={()=>scrollTop()}><TreeItem nodeId={String(item.id)} label={item.title} /></Link>
       );
    });

    return(
      <TreeView 
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}>
        <TreeItem nodeId={String(element.id)} label={element.title}>{nestedCat}</TreeItem>
      </TreeView>
    )
}