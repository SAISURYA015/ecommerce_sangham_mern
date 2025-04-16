import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoding: false,
  productList: [],
  productDetails: null
}

  // fecth all products
  export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllFilteredProducts",
    async ({filterParams, sortParams}) => {

      const query = new URLSearchParams({
        ...filterParams, 
        sortBy: sortParams
      })

      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`, 
        )
      return result?.data;
  })

  export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get/${id}`, 
        )
      return result?.data;
  })

const shoppingProductSlice = createSlice({
  name :'shoppingProducts',
  initialState,
  reducers : {
    setProductDetails: (state) => {
      state.productDetails = null
    }
  },
  extraReducers : (builder) => {
    builder.addCase(fetchAllFilteredProducts.pending, (state, action)=>{
      state.isLoding = true
    }).addCase(fetchAllFilteredProducts.fulfilled, (state, action)=>{
      // console.log(action.payload, 'action.payload');
      state.isLoding = false
      state.productList = action.payload.data
    }).addCase(fetchAllFilteredProducts.rejected, (state, action)=>{
      state.isLoding = false
      state.productList = []
    }).addCase(fetchProductDetails.pending, (state, action)=>{
      state.isLoding = true;
    }).addCase(fetchProductDetails.fulfilled, (state, action)=>{
      // console.log(action.payload, 'action.payload'); 
      state.isLoding = false;
      state.productDetails = action.payload.data
    }).addCase(fetchProductDetails.rejected, (state, action)=>{
      state.isLoding = false;
      state.productDetails = null;
    })
  }
})

export const {setProductDetails} = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;