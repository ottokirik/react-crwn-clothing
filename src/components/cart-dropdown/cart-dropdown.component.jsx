import React from "react";

import CustomButton from "../custom-button";

import "./cart-dropdown.styles.sass";

const CartDropdown = () => (
  <div className="cart-dropdown">
    <div className="cart-items"></div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

export default CartDropdown;
