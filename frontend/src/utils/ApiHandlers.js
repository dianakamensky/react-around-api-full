export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _request(path, method, body) {
    return fetch(`${this._url}/${path}`, {
      method,
      headers: this._headers,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }

  getInitialCards() {
    return this._request("/cards", "GET");
  }

  getUserInfo() {
    return this._request("/users/me", "GET");
  }

  updateCardLike(id, like) {
    const method = like ? "DELETE" : "PUT";
    return this._request(`/cards/likes/${id}`, method);
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`, "DELETE");
  }

  saveProfile(data) {
    return this._request("/users/me", "PATCH", data);
  }

  saveLocation(data) {
    return this._request("/cards", "POST", data);
  }

  saveAvatar(link) {
    return this._request("/users/me/avatar", "PATCH", { avatar: link });
  }
}
