export const BASE_URL = "https://register.nomoreparties.co";

function request(
  path,
  method,
  body,
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
) {
  return fetch(`${BASE_URL}/${path}`, {
    method,
    headers,
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
}

export const register = (email, password) =>
  request("signup", "POST", { password, email });

export const authorize = (email, password) =>
  request("signin", "POST", { password, email }).then((data) => {
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    return data;
  });

export const checkToken = (token) => {
  return request("users/me", "GET", undefined, {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });
};
