import axios from "axios";

axios.defaults.baseURL = "https://qaamuusbackend.up.railway.app/";
axios.defaults.withCredentials = true;
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
