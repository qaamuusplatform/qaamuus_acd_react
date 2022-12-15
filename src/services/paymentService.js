import http from "./httpService";

export const pay = (url, obj) => {
  return http.post(url, obj);
};
