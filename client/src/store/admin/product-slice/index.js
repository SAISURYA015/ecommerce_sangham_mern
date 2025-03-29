import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  productList: [],
}

// add new product
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post("http://localhost:5000/api/admin/products/add", formData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    return result?.data;
  })

  // fecth all products
export const fecthAllProducts = createAsyncThunk(
    "/products/fecthAllProducts",
    async (formData) => {
      const result = await axios.get(
        "http://localhost:5000/api/admin/products/get", 
        )
      return result?.data;
  })


  // edit a product
  export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({id, formData}) => {
      const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      return result?.data;
  })

// delete a prodcut
  export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async (id) => {
      const result = await axios.delete(
        `http://localhost:5000/api/admin/products/delete/${id}`, 
       
      )
      return result?.data;
  })


const AdminProductSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fecthAllProducts.pending, (state) => {
      state.isLoading = true
    }).addCase(fecthAllProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.productList = action.payload.data
    }).addCase(fecthAllProducts.rejected, (state, action) => {
      state.isLoading = false
      state.productList = []
    })
  }
})

export default AdminProductSlice.reducer;