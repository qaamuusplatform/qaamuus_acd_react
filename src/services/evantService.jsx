import http from "./httpService";

const apiEndpoint = "api/qaEvent-list/";

export const getEvents = () => {
  return http.get(apiEndpoint);
};
