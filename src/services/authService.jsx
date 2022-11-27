import http from "./httpService";
import jwtDecode from "jwt-decode";

const endPoint = "jwt-login/";

const token = "jwt";

export const login = async (username, password) => {
  const { data } = await http.post(endPoint, {
    username,
    password,
    withCredentials: true,
  });

  // if (data) {
  //   document.cookie = `name=${data.jwt}; domain=qaamuus.academy;`;
  // }
};

export const getCurrentUser = () => {
  try {
    const jwtToken = localStorage.getItem(token);

    return jwtDecode(jwtToken);
  } catch (error) {
    return null;
  }
};
