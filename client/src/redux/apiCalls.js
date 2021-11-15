import { axiosWithoutJwtInstance } from "../helpers/axiosInstance";
import { loginFailure, loginStart, loginSuccess } from "./user/userSlice"


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