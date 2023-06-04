const ordersReducers =(state = null,action)=>{
    switch(action.type){
        case "SET_ORDERS":
            return action.order;

        case "GET_ORDERS":
            return state;
        
        default:
            return state;
    }
};
export default ordersReducers;