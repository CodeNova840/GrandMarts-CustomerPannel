

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, size, color } = action.payload;
            console.log("Adding to cart:", { productId: product.id, size, color });
        console.log("incrementing",product)

        console.log("Current Cart:", state.carts);
        
            const itemIndex = state.carts.findIndex(
                (item) =>
                    item.product.id === product.id && 
                item.size.id === size.id  && 
                item.color === color
            );
            console.log("itemIndex ",itemIndex )
        
            if (itemIndex >= 0) {
                // Item already in cart, update the quantity
                state.carts[itemIndex].quantity += 1;
            } else {
                // New item, add to cart with quantity 1
                state.carts.push({ product, size, color, quantity: 1 });
            }
        },
        
        
        removeFromCart: (state, action) => {
            console.log('Removing from cart:', action.payload); // Log entire payload to verify its structure
            if (action.payload && action.payload.id) {
                state.carts = state.carts.filter((item) => item.product.id !== action.payload.id);
                console.log('Cart after removing:', state.carts);
                
            } else {
                console.error('Invalid payload received for removeFromCart:', action.payload);
            }
        },
        decrementQuantity: (state, action) => {
            const { product } = action.payload;
        
            console.log('Decrementing quantity for:', { product });
            console.log('Current cart:', state.carts);
        
            // Find the index of the item in the cart that matches the product id
            const itemIndex = state.carts.findIndex(item => item.id === product.id);
            console.log(itemIndex)
        
            if (itemIndex >= 0) {
                console.log('Item found in cart:', state.carts[itemIndex]);
        
                // Check if the quantity is greater than 1, then decrement
                if (state.carts[itemIndex].quantity > 1) {
                    state.carts[itemIndex].quantity -= 1;
                } else {
                    // Remove item from cart if quantity is 1
                    state.carts.splice(itemIndex, 1);
                }
        
                console.log('Cart after decrementing:', state.carts);
            } else {
                console.error('Item not found in cart:', { product });
            }
        },
        
        
        
    },
});

export const { addToCart, removeFromCart, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
