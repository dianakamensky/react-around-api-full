export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _request(path, method, body) {
    const jwt = localStorage.getItem("jwt");
    const headers = jwt
      ? { authorization: `Bearer ${jwt}`, ...this._headers }
      : this._headers;
    return fetch(`${this._url}/${path}`, {
      method,
      headers: headers,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }

  getInitialCards() {
    return this._request("cards", "GET");
  }

  getUserInfo() {
    return this._request("users/me", "GET");
  }

  updateCardLike(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return this._request(`cards/${id}/likes`, method);
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, "DELETE");
  }

  saveProfile(data) {
    return this._request("users/me", "PATCH", data);
  }

  saveLocation(data) {
    return this._request("cards", "POST", data);
  }

  saveAvatar(link) {
    return this._request("users/me/avatar", "PATCH", { avatar: link });
  }

  register(email, password) {
    this._request("signup", "POST", { password, email });
  }

  authorize(email, password) {
    this._request("signin", "POST", { password, email }).then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }
      return data;
    });
  }
}
