import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

import "./cart-dropdown.styles.scss";

const CartDropDown = () => {
    const cartItems = useSelector(selectCartItems);
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
