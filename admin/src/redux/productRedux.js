import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //IMPORTANTE: todas las acciones start y Failure son iguales,no tengo porque crear 3 por cada verbo,sino 1 + 2 que sean productStart y productFailure(con 6 me valia en vez de 12) 
    /* --- GET PRODUCTS --- */
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      // dado que state.error ya es false no lo declaro
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    /* --- DELETE A PRODUCT --- */
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      // console.log(state.products.findIndex( (item) => item._id === state.payload))
      //con redux+toolkit puedo usar splice,con redux normal no puedo ya que muto el state(el indice de splice empieza en 0).Fijate que no sé el indice asi que lo dejo preparado para que busque por el id y me devuelva el index 
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload)
        ,1);
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    /* --- UPDATE A PRODUCT --- */
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      // lógica: [0,1,2,3][2] = 4 => [0,1,4,3]
      // en este caso necesito dos payloads. 
      let payload = {
        id:action.payload.id,
        ...action.payload.product
      }
      state.products[state.products.findIndex((item) => item._id === action.payload.id)] = payload;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    /* --- CREATE A PRODUCT --- */
    createProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    createProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export default productSlice.reducer;
export const { 
   getProductStart,
   getProductFailure,
   getProductSuccess,
   deleteProductStart,
   deleteProductSuccess,
   deleteProductFailure,
   updateProductStart,
   updateProductSuccess,
   updateProductFailure,
   createProductStart,
   createProductSuccess,
   createProductFailure,
   } =
  productSlice.actions;
