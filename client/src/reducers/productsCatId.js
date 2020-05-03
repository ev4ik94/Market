

export default function ProductsCatId(state = [], action){


  	if(action.type==='GET_ProductsCatId') {
  		let data = action.payload || [];
  		  		
  		return data;
  	};
  	

  	return state;	
}