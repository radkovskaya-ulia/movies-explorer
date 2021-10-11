import axios from "axios";

export const BASE_URL = "https://api.radkovskaya-diploma.nomoredomains.monster";

const headers = {
  "Content-Type": "application/json",
};

export const register = (data) => {
  return axios
    .post(
      `${BASE_URL}/signup`,
      { email: data.email, password: data.password, name: data.name },
      {
        headers,
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const authorize = (data) => {
  return axios
    .post(
      `${BASE_URL}/signin`,
      { email: data.email, password: data.password },
      {
        headers,
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const getContent = (token) => {
  return axios
    .get(`${BASE_URL}/users/me`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};
