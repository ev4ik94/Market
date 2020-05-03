import axios from 'axios';

export const productsAll = () => {

    return async function (dispatch) {
      
      let response = await axios.get("/products", { headers: { 'Content-Type': 'application/json'}})
      
       function dispatchLogin ( resp ) { 
        dispatch({type: 'GET_Products', payload:resp});
      }
      
      return dispatchLogin( await response.data.products )
        
  }
  
}


export const productsCatId = (catId) => {

    return async function (dispatch) {
      
      let response = await axios.get("/products/"+catId, { headers: { 'Content-Type': 'application/json'}})
      
       function dispatchLogin ( resp ) { 
        dispatch({type: 'GET_ProductsCatId', payload:resp});
      }
      
      return dispatchLogin( await response.data.products )
        
  }
  
}


export const getCategories = () => {

    return async function (dispatch) {
      
      let response = await axios.get("/categories", { headers: { 'Content-Type': 'application/json'}})
      
       function dispatchLogin ( resp ) { 
        dispatch({type: 'GET_LIST', payload:resp});
      }
      
      return dispatchLogin( await response.data.categories )
        
  }
  
}