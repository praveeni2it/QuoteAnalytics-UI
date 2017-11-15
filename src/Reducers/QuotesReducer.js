import actions from "../Actions/ActionTypes";

const initialState = {
  customers: [],
  products: [],
  deliveryAdder: 0,
  customerAdder: 0,
  customerVariance: 0,
  finalPrice: 0
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
    case actions.GET_CUSTOMER_ADDER:
      return {
        ...state,
        deliveryAdder: action.data.customer.deliveryAdder,
        customerAdder: action.data.customer.customerAdder,
        customerVariance: action.data.customer.customerVariance,
        finalPrice: action.data.customer.finalPrice
      };
    default:
      return state;
  }
};

export default quotesReducer;
