import http from "./httpService";

const endPoint = "/api/jwt-login/";
import useSWR from "swr";
const token = "jwt";

export const login = async (username, password) => {
  const { data } = await http.post(endPoint, { username, password });
  console.log(data);
};

export const getLoggedInUser = () => {
  try {
    return http.get("api/userProfile-detail/14/");
  } catch (error) {
    return null;
  }
};
