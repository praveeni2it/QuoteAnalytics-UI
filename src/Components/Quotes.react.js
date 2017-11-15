import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import _ from "underscore";
import QuotesActions from "../Actions/QuotesActions";

@connect((store) => {
  return {
    "customers": store.quotes.customers,
    "products": store.quotes.products,
    "deliveryAdder": store.quotes.deliveryAdder,
    "customerAdder": store.quotes.customerAdder,
    "customerVariance": store.quotes.customerVariance,
    "finalPrice": store.quotes.finalPrice
  };
})

class Quotes extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      customers: this.props.customers,
      products: this.props.products,
      deliveryAdder: 0,
      customerAdder: 0,
      customerVariance: 0,
      cost: 0,
      finalPrice: 0,
      isCustomer: true,
      isProduct: true,
      isAdder: false,
      customerId: "",
      productId: "",
      deliveryYear: ""
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      customers: nextProps.customers,
      products: nextProps.products,
      deliveryAdder: nextProps.deliveryAdder,
      customerAdder: nextProps.customerAdder,
      customerVariance: nextProps.customerVariance,
      finalPrice: nextProps.finalPrice,
      isCustomer: false,
      isProduct: false,
      isAdder: false
    });
  }

  componentDidMount () {
    this.el = $(ReactDOM.findDOMNode(this));
    QuotesActions.getAllCustomers();
    QuotesActions.getAllProducts();
    this.el.find(".dropdown.customer").dropdown({
      onChange: (value) => {
        this.setState({
          customerId: value,
        }, () => {
          this.getCustomerData();
        });
      }
    });
    this.el.find(".dropdown.product").dropdown({
      onChange: (value) => {
        this.setState({
          productId: value
        }, () => {
          this.getCustomerData();
        });
      }
    });
    this.el.find(".dropdown.financial-year").dropdown({
      onChange: (value) => {
        this.setState({
          deliveryYear: value
        }, () => {
          this.getCustomerData();
        });
      }
    });
  }

  getCustomerData = () => {
    const {cost, deliveryYear, customerId, productId} = this.state;
    if (customerId && productId && deliveryYear) {
      this.setState({
        isAdder: true
      }, () => {
        const payload = {
          cost: cost,
          deliveryYear: deliveryYear,
          customerId: customerId,
          productId: productId
        };
        QuotesActions.getCustomerAdder(payload);
      });
    }
  }

  handleCostChange = (event) => {
    this.setState({
      cost: event.target.value
    }, () => {
      this.getCustomerData();
    });
  }

  render () {
    const {
      customers,
      products,
      deliveryAdder,
      customerAdder,
      customerVariance,
      cost,
      finalPrice,
      isCustomer,
      isProduct,
      isAdder,
    } = this.state;
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
          <div className="four wide column"></div>
          <div className="four wide column">
            <div className="ui sub header">Financial Year</div>
            <select className="ui dropdown financial-year">
              <option value="">Select a Financial year</option>
              <option value="FY18">FY18</option>
              <option value="FY19">FY19</option>
              <option value="FY20">FY20</option>
            </select>
          </div>
        </div>
        <div className="ui grid">
          <div className="four wide column">
            <div className="ui sub header">Cost</div>
            <div className="ui icon input">
              <input type="text" value={cost} onChange={this.handleCostChange}
                placeholder="Cost" />
            </div>
          </div>
        </div>
        <div className="ui grid">
          <div className="four wide column">
            <div className="ui sub header">Delivery Adder</div>
            <div className={isAdder ? "ui icon input loading" : "ui icon input"}>
              <input type="text" value={deliveryAdder}
                placeholder="Delivery Adder" />
            </div>
          </div>
          <div className="four wide column">
            <div className="ui sub header">Customer Adder</div>
            <div className={isAdder ? "ui icon input loading" : "ui icon input"}>
              <input type="text" value={customerAdder}
                placeholder="Customer Adder" />
            </div>
          </div>
          <div className="four wide column">
            <div className="ui sub header">Customer Variance</div>
            <div className={isAdder ? "ui icon input loading" : "ui icon input"}>
              <input type="text" value={customerVariance}
                placeholder="Customer Variance" />
            </div>
          </div>
        </div>
        <div className="ui grid">
          <div className="four wide column"></div>
          <div className="four wide column"></div>
          <div className="four wide column">
            <div className="ui left action input">
              <button className="ui teal labeled icon button">
                <i className="money icon"></i>
                Final Price
              </button>
              <input type="text" value={finalPrice} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Quotes;
