import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";

class Header extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <header>
        <div className="bussinessLogo">
          <Link to="/">
            <img
              alt="logo"
              src="https://img.icons8.com/dusk/64/000000/buy.png"
            />
          </Link>
          <div> Fast Shopping </div>
        </div>

        {cartItems.length === 0 ? (
          <Link to="/cart">
            <div className="logoCart">
              <div className="tag">0</div>
              <img
                alt="LogoCart"
                src="https://img.icons8.com/carbon-copy/48/000000/buy--v2.png"
              />
            </div>
          </Link>
        ) : (
          <Link to="/cart">
            <div className="logoCart">
              <div className="tag">
                {cartItems.reduce(
                  (accumulator, item) => accumulator + item.count,
                  0
                )}
              </div>
              <img
                alt="LogoCart"
                src="https://img.icons8.com/carbon-copy/48/000000/buy--v2.png"
              />
            </div>
          </Link>
        )}
      </header>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart }
)(Header);
