import Api from "./ApiHandlers";

const api = new Api({
  baseUrl: "https://api.around.students.nomoredomainssbs.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
