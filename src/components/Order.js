import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearOrder } from "../actions/orderActions";
import { clearCart } from "../actions/cartActions";
class Order extends Component {
  render() {
    return (
      <div className="order">
        <div className="order">
          <h1 id="titleOrder">Thanks for your purchase</h1>
          <h3 id="textOrder">
            {this.props.location.state.detail.name}, we have created your order
            #{this.props.location.state.detail._id}. Your items will be soon at
            your door.
          </h3>
          <Link onClick={this.props.clearOrder} className="linkHome" to="/">
            Start Again
          </Link>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    order: state.order.order,
  }),
  { clearOrder, clearCart }
)(Order);
