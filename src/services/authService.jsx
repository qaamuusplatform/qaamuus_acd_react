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
    // return {}
    return http.get("api/userProfile-detail/14/");
  } catch (error) {
    return null;
  }
};

export const updateUserInfo = async (body, theUserId) => {
  try {
    userInfo = await http.post(
      "/api/userProfile-update/" + theUserId + "/",
      body,
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return null;
  }
};
