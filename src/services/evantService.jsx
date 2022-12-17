import http from "./httpService";

const apiEndPoint = "/api/inrollEventToUser";

export const getEvents = async (url) => {
  const data = await http.get(url);
  return data.data;
};

export const getEvent = async (url) => {
  const data = await http.get(url);
  return data.data;
};

export const processPayment = async (body) => {
  const data = await http.post(`${apiEndPoint}/${body.type}/`, body);
  return data.data;
};
