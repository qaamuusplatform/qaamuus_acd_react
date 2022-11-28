import http from "./httpService";

const endPoint = "/api/jwt-login/";

const token = "jwt";

export const login = async (username, password) => {
  const { data } = await http.post(endPoint, { username, password });
  console.log(data)

};

export const getLoggedInUser = async() => {
  try {
    var userInfo= await http.get('/api/userProfile-detail/14/');
    return userInfo.data
    // return jwtDecode(jwtToken);
  } catch (error) {
    return null;
  }
};
