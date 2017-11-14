import QuotesApi from "../Api/QuotesApi";
import actions from "./ActionTypes";
import dispatch from "../Dispatcher/dispatch";

const quoteActions = {
  getAllCustomers: () => {
    dispatch((action) => {
      QuotesApi.getAllCustomers().then((response) => {
        action({
          type: actions.GET_ALL_CUSTOMERS,
          data: response.data
        });
      }).catch((error) => {
        throw(error);
      });
    });
  },
  getAllProducts: () => {
    dispatch((action) => {
      QuotesApi.getAllProducts().then((response) => {
        action({
          type: actions.GET_ALL_PRODUCTS,
          data: response.data
        });
      }).catch((error) => {
        throw(error);
      });
    });
  },
  getDeliveryAdder: (payload) => {
    dispatch((action) => {
      QuotesApi.getDeliveryAdder(payload).then((response) => {
        action({
          type: actions.GET_DELIVERY_ADDER,
          data: response.data
        });
      }).catch((error) => {
        throw(error);
      });
    });
  },
  getCustomerAdder: (payload) => {
    dispatch((action) => {
      QuotesApi.getCustomerAdder(payload).then((response) => {
        action({
          type: actions.GET_CUSTOMER_ADDER,
          data: response.data
        });
      }).catch((error) => {
        throw(error);
      });
    });
  },
  getCustomerVariance: (payload) => {
    dispatch((action) => {
      QuotesApi.getCustomerVariance(payload).then((response) => {
        action({
          type: actions.GET_CUSTOMER_VARIANCE,
          data: response.data
        });
      }).catch((error) => {
        throw(error);
      });
    });
  }
};

export default quoteActions;
