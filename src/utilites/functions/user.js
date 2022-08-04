import axios from "axios";
import { useDispatch } from "react-redux";
import { handlelogInUser } from "../../features/auth/authSlice";
import { Api_url, login_api } from "../ApiConstants";

// for Log In
export const UserLogin = async (login_id, password) => {
  // const dispatch = useDispatch();
  axios.post(Api_url + login_api, login_id, password).catch((err) => {
    console.log(err);
  });
};
