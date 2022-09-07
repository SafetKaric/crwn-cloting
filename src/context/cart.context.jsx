import { createContext, useEffect, useState } from "react";

const onAddCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(
        (cardItem) => cardItem.id === productToAdd.id
    );

    if (existingItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const onRemoveItemFromCart = (cartItems, cartItemToRemove) => {
    const existingItem = cartItems.find(
        (cardItem) => cardItem.id === cartItemToRemove.id
    );

    if (existingItem.quantity === 1) {
        return cartItems.filter(
            (cartItem) => cartItem.id !== cartItemToRemove.id
        );
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const onClearItemFromCart = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    setIsCartOpen: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(onAddCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(onRemoveItemFromCart(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(onClearItemFromCart(cartItems, cartItemToClear));
    };

    const value = {
        isCartOpen,
        cartItems,
        cartCount,
        cartTotal,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
    };

    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    );
};
