import actions from "../Actions/ActionTypes";

const initialState = {
  customers: [],
  products: [],
  deliveryAdder: 0,
  customerAdder: 0,
  customerVariance: 0
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
    case actions.GET_DELIVERY_ADDER:
      return {
        ...state,
        deliveryAdder: action.data.deliveryAdder.deliveryAdder
      };
    case actions.GET_CUSTOMER_ADDER:
      return {
        ...state,
        customerAdder: action.data.customerAdder.customerAdder
      };
    case actions.GET_CUSTOMER_VARIANCE:
      return {
        ...state,
        customerVariance: action.data.customerVariance.customerVariance
      };
    default:
      return state;
  }
};

export default quotesReducer;
