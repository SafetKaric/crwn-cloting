import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropDown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHander = () => navigate("/checkout");

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <p className="card-empty-text">Card is empty</p>
                )}
            </div>
            <Button onClick={goToCheckoutHander}>Checkout</Button>
        </div>
    );
};

export default CartDropDown;
