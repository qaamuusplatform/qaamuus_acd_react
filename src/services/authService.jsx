import http from "./httpService";

const endPoint = "jwt-login/";

const token = "jwt";

export const login = async (username, password) => {
  const { data } = await http.post(endPoint, { username, password });


};

export const getCurrentUser = () => {
  try {
    const jwtToken = localStorage.getItem(token);

    // return jwtDecode(jwtToken);
  } catch (error) {
    return null;
  }
};
