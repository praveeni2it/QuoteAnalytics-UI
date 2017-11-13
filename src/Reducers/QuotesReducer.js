import actions from "../Actions/ActionTypes";

const initialState = {
  customers: [],
  products: []
};

const quotesReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: action.data.customers
      };
    case actions.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.data.products
      };
    default:
      return state;
  }
};

export default quotesReducer;
