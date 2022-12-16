import axios from "axios";

axios.defaults.baseURL = "https://qaamuusbackend.up.railway.app/";
axios.defaults.withCredentials = true;
export const httpAxiosWithToken = axios.create({
  baseURL: "https://qaamuusbackend.up.railway.app/",
  headers:{
    'Authorization': localStorage.getItem("access")? "Bearer "+localStorage.getItem("access") :null,
    // 'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxNzc2MDkzLCJpYXQiOjE2NzExNzEyOTMsImp0aSI6IjlhYWU5YmI0ZDU5MTQ3MmVhNDFiM2RjMTEyNWE1NTEyIiwidXNlcl9pZCI6NH0.ch_fgWGHEbc13sVlKR-kT4iv8dTJd6TGUogSekvDals",
    'Content-Type':'application/json',
    'accept': 'application/json'
  },
  withCredentials:true
})
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
