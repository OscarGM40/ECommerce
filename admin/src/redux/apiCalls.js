import {
  axiosWithJwtInstance,
  axiosWithoutJwtInstance,
} from "../helpers/axiosInstance";
import {
  createProductFailure,
  createProductStart,
  createProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "./userRedux";


// fijate que con un apiCalls me deberia valer,aunque no es mala idea hacer varios si el proyecto es grande
export const loginCall = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosWithoutJwtInstance.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure());
  }
};

export const logoutCall = async (dispatch) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
  } catch (error) {
    console.log(error);
    dispatch(logoutFailure());
  }
};

export const getUsersCall = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosWithJwtInstance.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getUsersFailure());
  }
};

export const deleteUserCall = async (id,dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axiosWithJwtInstance.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    console.log(error);
    dispatch(deleteUserFailure());
  }
};

export const getProductsCall = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axiosWithJwtInstance.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getProductFailure());
  }
};

export const deleteProductCall = async (id,dispatch) => {
  dispatch(deleteProductStart());
  try {
    await axiosWithJwtInstance.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    console.log(error);
    dispatch(deleteProductFailure());
  }
};


export const updateProductCall = async (id, product ,dispatch) => {
  dispatch(updateProductStart());
  try {
    await axiosWithJwtInstance.put(`/products/${id}`,product);
    dispatch(updateProductSuccess({id,product}));
  } catch (error) {
    console.log(error);
    dispatch(updateProductFailure());
  }
};

export const createProductCall = async (product,dispatch) => {
  dispatch(createProductStart());
  try {
    const res = await axiosWithJwtInstance.post(`/products`,product);
    dispatch(createProductSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(createProductFailure());
  }
};
