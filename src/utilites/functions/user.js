import axios from 'axios'
import { Api_url, login_api } from '../ApiConstants'

// for Log In
export const UserLogin = async (login_id, password) => {
  // const dispatch = useDispatch();
  const url = Api_url + login_api;
  // console.log(url);
  // console.log(login_id, password);
  axios
    .post(url, {
      login_id,
      password,
    })
    .then((res) => {
      if (res && res.status == 200) {
        // dispatch(handlelogInUser(res.data));
        // console.log(res.data);
      }
    })
    .catch((err) => {
      // console.log(err);
    });
};
