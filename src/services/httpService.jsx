import axios from "axios";

axios.defaults.baseURL = "https://qaamuusapiend.up.railway.app/api/";
axios.defaults.withCredentials = true;
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
