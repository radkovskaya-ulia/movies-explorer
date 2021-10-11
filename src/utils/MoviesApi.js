import axios from "axios";

class MoviesApi {
  constructor(config) {
    this._url = config.url;
  }

  getCards() {
    return axios
      .get(`${this._url}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        return response.data;
      });
  }
}

export const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
});
