import Button from "../button/button.component";

import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, price, imageUrl } = product;

    const addItemToCartHandler = () => {
        dispatch(addItemToCart(cartItems, product));
    };

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}.jpg`} />
            <div className="footer">
                <span className="name"> {name} </span>
                <span className="price"> {price}€</span>
            </div>
            <Button onClick={addItemToCartHandler} buttonType="inverted">
                Add to card
            </Button>
        </div>
    );
};

export default ProductCard;
