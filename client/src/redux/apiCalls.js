import { axiosWithoutJwtInstance } from "../helpers/axiosInstance";
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from "./user/userSlice"


export const loginCall = async(user,dispatch) => {
   dispatch(loginStart());
   try {
      const res = await axiosWithoutJwtInstance.post("/auth/login",user);
      dispatch(loginSuccess(res.data));   
   } catch (error) {
      console.log(error)
      dispatch(loginFailure())
   }
}


export const logoutCall = async (dispatch) => {
   dispatch(logoutStart());
   try {
     dispatch(logoutSuccess());
      localStorage.removeItem("persist:root");
   } catch (error) {
     console.log(error);
     dispatch(logoutFailure());
   }
 };