import http from "./httpService";

export const getEvents = async (url) => {
  const data = await http.get(url);
  return data.data;
};

export const getEvent = async (url) => {
  const data = await http.get(url);
  return data.data;
};
