import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);
    const { name, price, imageUrl } = product;

    const addItemToCartHandler = () => {
        addItemToCart(product);
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
