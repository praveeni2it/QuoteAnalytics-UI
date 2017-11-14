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
    "customerVariance": store.quotes.customerVariance
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
      deliveryAdderValue: 0,
      customerAdderValue: 0,
      customerVarianceValue: 0,
      cost: 0,
      finalPrice: 0,
      isCustomer: true,
      isProduct: true,
      isDeliveryAdder: false,
      isCustomerData: false,
      customerId: "",
      productId: ""
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      customers: nextProps.customers,
      products: nextProps.products,
      deliveryAdder: nextProps.deliveryAdder,
      customerAdder: nextProps.customerAdder,
      customerVariance: nextProps.customerVariance,
      isCustomer: false,
      isProduct: false,
      isDeliveryAdder: false,
      isCustomerData: false
    }, () => {
      this.handleAnalytics();
    });
  }

  componentDidMount () {
    this.el = $(ReactDOM.findDOMNode(this));
    QuotesActions.getAllCustomers();
    QuotesActions.getAllProducts();
    this.el.find(".dropdown.customer").dropdown({
      onChange: (value) => {
        this.setState({
          customerId: value
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
          isDeliveryAdder: true
        }, () => {
          QuotesActions.getDeliveryAdder({
            deliveryYear: value
          });
        });
      }
    });
  }

  getCustomerData = () => {
    const {customerId, productId} = this.state;
    if (customerId && productId) {
      const payload = {
        customerId: customerId,
        productId: productId
      };
      QuotesActions.getCustomerAdder(payload);
      QuotesActions.getCustomerVariance(payload);
    }
  }

  handleCostChange = (event) => {
    this.setState({
      cost: event.target.value
    }, () => {
      this.handleAnalytics();
    });
  }

  handleAnalytics = () => {
    const {cost, deliveryAdder, customerAdder, customerVariance} = this.state;
    const deliveryAdderValue = (cost * deliveryAdder) / 100;
    const customerAdderValue = (cost * customerAdder) / 100;
    const customerVarianceValue = (cost * customerVariance) / 100;
    const finalPrice = deliveryAdderValue + customerAdderValue + customerVarianceValue;
    this.setState({
      deliveryAdderValue: deliveryAdderValue,
      customerAdderValue: customerAdderValue,
      customerVarianceValue: customerVarianceValue,
      finalPrice: finalPrice
    });
  }

  render () {
    const {
      customers,
      products,
      deliveryAdderValue,
      customerAdderValue,
      customerVarianceValue,
      finalPrice,
      isCustomer,
      isProduct,
      isDeliveryAdder,
      isCustomerData
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
              <input type="text" onChange={this.handleCostChange}
                placeholder="Cost" />
            </div>
          </div>
        </div>
        <div className="ui grid">
          <div className="four wide column">
            <div className="ui sub header">Delivery Adder</div>
            <div className={isDeliveryAdder ? "ui icon input loading" : "ui icon input"}>
              <input type="text" value={deliveryAdderValue}
                placeholder="Delivery Adder" />
            </div>
          </div>
          <div className="four wide column">
            <div className="ui sub header">Customer Adder</div>
            <div className={isCustomerData ? "ui icon input loading" : "ui icon input"}>
              <input type="text" value={customerAdderValue}
                placeholder="Customer Adder" />
            </div>
          </div>
          <div className="four wide column">
            <div className="ui sub header">Customer Variance</div>
            <div className={isCustomerData ? "ui icon input loading" : "ui icon input"}>
              <input type="text" value={customerVarianceValue}
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
