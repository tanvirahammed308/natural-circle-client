import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import { Product } from '@/types';

interface ProductsState {
  saleItems: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  saleItems: [],
  status: 'idle',
  error: null,
};

// Fetches products via the shared axios client and keeps only the ones
// that actually have a discount (compareAtPrice set higher than price).
export const fetchSaleProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchSaleProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products?limit=50');
      return (data.products as Product[])
        .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
        .slice(0, 8);
    } catch (err) {
      // api.ts's response interceptor already normalizes this to a plain Error with a clean message
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to load products');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaleProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSaleProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.saleItems = action.payload;
      })
      .addCase(fetchSaleProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Something went wrong.';
      });
  },
});

export const selectSaleProducts = (state: { products: ProductsState }) => state.products.saleItems;
export const selectSaleProductsStatus = (state: { products: ProductsState }) => state.products.status;
export const selectSaleProductsError = (state: { products: ProductsState }) => state.products.error;

export default productsSlice.reducer;