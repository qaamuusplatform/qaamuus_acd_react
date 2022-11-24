import http from "./httpService";

const endPoint = "jwt-login/";

export const login = async (data) => {
  const response = await http.post(endPoint, {
    username: data.username,
    password: data.password,
  });

  if (response.data) {
    localStorage.setItem("jwtToken", response.data.jwt);
  }
};
