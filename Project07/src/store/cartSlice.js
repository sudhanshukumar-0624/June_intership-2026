import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, size } = action.payload;
      const existingIndex = state.items.findIndex(
        item => item.id === product.id && item.selectedSize === size
      );
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push({ ...product, selectedSize: size, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        item => !(item.id === id && item.selectedSize === size)
      );
    },
    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const item = state.items.find(
        item => item.id === id && item.selectedSize === size
      );
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            i => !(i.id === id && i.selectedSize === size)
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;
export const selectCartCount = state =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = state =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
