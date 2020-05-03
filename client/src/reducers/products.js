

export default function Products(state = [], action){


  	if(action.type==='GET_Products') {
  		let data = action.payload || [];
  		  		
  		return data;
  	};
  	

  	return state;	
}