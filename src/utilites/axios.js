import axios from 'axios'
import { Api_url } from './ApiConstants'

// For common config
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";

const mainAxios = axios.create({
  baseURL: Api_url,
  timeout: 10000,
});

export {mainAxios};
