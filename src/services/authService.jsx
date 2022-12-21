import http, { httpAxiosWithToken } from "./httpService";

const endPoint = "/api/jwt-login/";
import useSWR from "swr";

const token = "jwt";

export const login = async (username, password) => {
  const { data } = await http.post(endPoint, { username, password });
  console.log(data);
};

export const getLoggedInUser = async () => {
  try {
    // respData=http.get("api/jwtAuthToken-user/")
    // console.log('the true',respData)
    let respData = {};
    try {
      respData = await httpAxiosWithToken.get("api/jwtAuthToken-user/");
      if (respData) {
        return respData;
      } else {
        return {};
      }
    } catch (error) {
      return {};
    }
  } catch (error) {
    return {};
  }
};

export const getAllUsernamesAnsEmails = async () => {
  const allUsernamesAndEmails = [];

  try {
    const { data } = await http.get("api/user-list/");
    let emails = [];
    let usernames = [];
    for (var userInfo of data) {
      emails.push(userInfo.email);
      usernames.push(userInfo.username);
    }
    allUsernamesAndEmails.push({ emails: emails, usernames: usernames });
    // allUsernamesAndEmails=data.username
  } catch (error) {}
  return allUsernamesAndEmails;
};

export const updateUserInfo = async (body, theUserId) => {
  try {
    const { data } = await http.post(
      `api/userProfile-update/${theUserId}/`,
      body
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const userAccessToken = () => {
  return localStorage.getItem("access");
};
