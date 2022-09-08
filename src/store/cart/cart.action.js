import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

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

export const addItemToCart = (cartItems, productToAdd) => {
    const newCardItems = onAddCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCardItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCardItems = onRemoveItemFromCart(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCardItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCardItems = onClearItemFromCart(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCardItems);
};
