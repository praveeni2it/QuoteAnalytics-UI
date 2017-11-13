import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import _ from "underscore";
import QuotesActions from "../Actions/QuotesActions";

@connect((store) => {
  return {
    "customers": store.quotes.customers,
    "products": store.quotes.products
  };
})

class Quotes extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      customers: this.props.customers,
      products: this.props.products,
      isCustomer: true,
      isProduct: true
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      customers: nextProps.customers,
      products: nextProps.products,
      isCustomer: false,
      isProduct: false
    });
  }

  componentDidMount () {
    this.el = $(ReactDOM.findDOMNode(this));
    QuotesActions.getAllCustomers();
    QuotesActions.getAllProducts();
    this.el.find(".dropdown.customer").dropdown();
    this.el.find(".dropdown.product").dropdown();
  }

  render () {
    const {customers, products, isCustomer, isProduct} = this.state;
    return (
      <div className="quotes">
        <div className="ui grid">
          <div className="four wide column">
            <div className="ui sub header">Customer</div>
            <select className="ui dropdown customer">
              <option value="">Select a Customer</option>
              {
                _.map(customers, (customer, key) => {
                  return (
                    <option key={key} value={customer.id}>
                      {customer.name}
                    </option>
                  );
                })
              }
            </select>
            {
              isCustomer
              ? <div className="ui active inline loader"></div>
              : null
            }
          </div>
          <div className="four wide column">
            <div className="ui sub header">Product</div>
            <select className="ui dropdown product">
              <option value="">Select a Product</option>
              {
                _.map(products, (product, key) => {
                  return (
                    <option key={key} value={product.id}>
                      {product.name}
                    </option>
                  );
                })
              }
            </select>
            {
              isProduct
              ? <div className="ui active inline loader"></div>
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Quotes;
