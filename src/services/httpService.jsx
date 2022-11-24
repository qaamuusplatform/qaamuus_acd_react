import axios from "axios";

axios.defaults.baseURL = "https://qaamuus.academy/api/";

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
