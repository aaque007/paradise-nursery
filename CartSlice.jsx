import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // { id, name, price, quantity, art }
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existing = state.items.find((item) => item.id === plant.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: plant.id,
          name: plant.name,
          price: plant.price,
          art: plant.art,
          quantity: 1,
        });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotalCost = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

export default cartSlice.reducer;
