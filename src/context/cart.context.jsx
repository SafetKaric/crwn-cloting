import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    isCartOpen: true,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

const CartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "SET_CART_ITEMS":
            return {
                ...state,
                ...payload,
            };
        default:
            throw new Error(`Unhendled type ${type} in CartReducer`);
    }
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
    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
        useReducer(CartReducer, INITIAL_STATE);

    const upateCartItemsReducer = (newCardItems) => {
        const newCartCount = newCardItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        const newCartTotal = newCardItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        dispatch({
            type: "SET_CART_ITEMS",
            payload: {
                cartItems: newCardItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount,
            },
        });
    };

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
        return cartItems.filter(
            (cartItem) => cartItem.id !== cartItemToClear.id
        );
    };

    const addItemToCart = (productToAdd) => {
        const newCardItems = onAddCartItem(cartItems, productToAdd);
        upateCartItemsReducer(newCardItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCardItems = onRemoveItemFromCart(cartItems, cartItemToRemove);
        upateCartItemsReducer(newCardItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCardItems = onClearItemFromCart(cartItems, cartItemToClear);
        upateCartItemsReducer(newCardItems);
    };

    const value = {
        isCartOpen,
        cartItems,
        cartCount,
        cartTotal,
        setIsCartOpen: () => true,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
    };

    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    );
};
