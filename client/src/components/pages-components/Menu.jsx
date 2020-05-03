import React, {useState, useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, 
ButtonGroup, List, ListItem, Container} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

import Drawer from '@material-ui/core/Drawer';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {Link} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import Buttons from './ButtonCartFav';


import './css/MenuBar.css';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backGrounMain:{
    background: 'rgb(23,129,198)',
  background: '-moz-linear-gradient(90deg, rgba(23,129,198,1) 19%, rgba(1,72,119,1) 68%)',
  background: '-webkit-gradient(left top, right top, color-stop(0%, rgba(23,129,198,1)), color-stop(100%, rgba(1,72,119,1)))',
  background: '-webkit-linear-gradient(90deg, rgba(23,129,198,1) 19%, rgba(1,72,119,1) 68%)',
  background: '-o-linear-gradient(90deg, rgba(23,129,198,1) 19%, rgba(1,72,119,1) 68%)',
  background: '-ms-linear-gradient(90deg, rgba(23,129,198,1) 19%, rgba(1,72,119,1) 68%)',
  background: 'linear-gradient(90deg, rgba(23,129,198,1) 19%, rgba(1,72,119,1) 68%)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  listRow:{
    display:'flex', 
    flexDirection:'row'
  },
  title: {
    flexGrow: 1,
    textAlign:'center'
  },

  menuBar:{
    width: '30%',
    padding: '15px'
  },
  burgerMenu: {
    fill:'#fefefe'
  },

  buttonSign: {
    fontSize:'.8rem',
    textTransform: 'none'
  }
  
}));



export default function ButtonAppBar({categories}) {
  const classes = useStyles();
  const [cat, setCat] = useState([]);

 const [state, setState] = useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  useEffect(()=>{
    if(cat.length===0&&categories.children){
      setCat(categories.children);
    }
  })

  

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.backGrounMain}>
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton 
           
          className={`${classes.menuButton} d-lg-none`} 
          aria-label="Open drawer"
            edge="start"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon className={classes.burgerMenu}/>
          </IconButton>
          <List className={`${classes.listRow} social-list d-lg-flex d-none`}>
            <ListItem><InstagramIcon /></ListItem>
            <ListItem><TwitterIcon /></ListItem>
            <ListItem><FacebookIcon /></ListItem>
          </List>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{color:'#fefefe'}}>Online Market</Link>
          </Typography>
          <ButtonGroup variant="text">
            <Button color="inherit" className={classes.buttonSign}>Sign In</Button>
            <Button color="inherit" className={classes.buttonSign}>Sign Up</Button>
          </ButtonGroup>
          
        </Toolbar>
        
        </Container>
      </AppBar>

      <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)} style={{paddingTop:'40px'}}>
           <CloseIcon onClick={toggleDrawer('left', false)} className="btn-close"/>
           {
            (cat||[]).map(element=>(
                <NestedCategories element={element} key={element.id} closeMenu={(anchor, open)=>toggleDrawer(anchor, open)}/>
              ))
           }
           <Buttons position={'flex-start'} xs={2}/>
      </Drawer>
      
    </div>
  );
}


function NestedCategories({element, closeMenu}){

    const classes = useStyles();

    const nestedCat = (element.children || []).map(item => {

      let url = `/${element.slug}/${item.slug}`;
       return(
        <Link to={url} key={item.id} className="text-color-grey" onClick={closeMenu('left', false)}><TreeItem nodeId={String(item.id)} label={item.title} /></Link>
       );
    });

    return(
      <TreeView 
      
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}>
        <TreeItem nodeId={String(element.id)} label={element.title} style={{padding:'10px 0px'}}>{nestedCat}</TreeItem>
      </TreeView>
    )
}