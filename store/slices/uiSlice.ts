import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
}

const initialState: UIState = { isCartOpen: false, isMobileMenuOpen: false };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart: (state, action: PayloadAction<boolean | undefined>) => {
      state.isCartOpen = action.payload ?? !state.isCartOpen;
    },
    toggleMobileMenu: (state, action: PayloadAction<boolean | undefined>) => {
      state.isMobileMenuOpen = action.payload ?? !state.isMobileMenuOpen;
    },
  },
});

export const { toggleCart, toggleMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;
