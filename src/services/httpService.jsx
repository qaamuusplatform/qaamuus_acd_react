import axios from "axios";

axios.defaults.baseURL = "https://qaamuus.academy/api/";
axios.defaults.withCredentials = true
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
