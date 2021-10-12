import axios from "axios";

class mainApi {
  constructor(config) {
    this._url = config.url;
  }

  _getHeaders() {
    const jwt = localStorage.getItem("jwt");
    return {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    };
  }

  getCards() {
    return axios
      .get(`${this._url}movies`, {
        headers: this._getHeaders(),
      })
      .then((response) => {
        return response.data;
      });
  }

  getUserInfo() {
    return axios
      .get(`${this._url}users/me`, {
        headers: this._getHeaders(),
      })
      .then((response) => {
        return response.data;
      });
  }

  addCard(data) {
    return axios
      .post(`${this._url}movies`, data, {
        headers: this._getHeaders(),
      })
      .then((response) => {
        return response.data;
      });
  }

  editProfile(data) {
    return axios
      .patch(`${this._url}users/me`, data, {
        headers: this._getHeaders(),
      })
      .then((response) => {
        return response.data;
      });
  }

  removeCard(cardId) {
    return axios
      .delete(`${this._url}movies/${cardId}`, {
        headers: this._getHeaders(),
      })
      .then((response) => {
        return response.data;
      });
  }
}

export const api = new mainApi({
  url: "https://api.radkovskaya-diploma.nomoredomains.monster/",
});
