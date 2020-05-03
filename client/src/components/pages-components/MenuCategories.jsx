import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Button, 
Container,Popover, MenuItem, MenuList} from '@material-ui/core';

import {Link} from "react-router-dom";
import Buttons from './ButtonCartFav';

import './css/MenuCategories.css';


const PopoverStyle = {
    top: '50px'
};


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    zIndex: 90
  },
  backGrounMain:{
    background: '#fefefe'
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
  }
}));



export default  function BotMenuCategory({categories}) {

  const classes = useStyles();
  const [catArr, setCategories] = useState([]);
  

  useEffect(()=>{
     
      if((categories.children?categories.children.length>0:categories.length>0)&&catArr.length===0){
        setCategories(categories.children);
      }

  })



  return (
    <div className={`${classes.root} d-lg-block d-none`}>
      <AppBar position="static" className={classes.backGrounMain}>
      <Container maxWidth="lg">
        <Toolbar style={{justifyContent:'space-between'}}>
          {
            (catArr || []).map((element, index) => {

            return <NestedCategories element={element} key={element.id}/>
            })
          }
          
         <Buttons position={'flex-end'} xs={1}/>
            
          
        </Toolbar>
        
        </Container>
      </AppBar>
    </div>
  );
}



function NestedCategories({element}){

    const classes = useStyles();

    
   
    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (click) => {
    await setAnchorEl(null);
  };

  const open = anchorEl!==null?true:false;
  const id = open ? 'simple-popover' : undefined;
  const url = `/${element.slug}/`;
    const nestedCat = (element.children || []).map(item => {
     
       return(
        <Link to={url+item.slug} key={item.id} className="text-color-grey" onClick={()=>setAnchorEl(null)}><MenuItem>{item.title}</MenuItem></Link>
       );
    });
    
    return(
      <MenuList className={`${classes.listRow} categories-list`}>
        <MenuItem>
            <Button onClick={handleClick}>{element.title}</Button>
            
            {element.children.length>0 && (<Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <MenuList>
                  {nestedCat}
                </MenuList>
              </Popover>)}

        </MenuItem >
      </MenuList>
    )
}

 
   

  