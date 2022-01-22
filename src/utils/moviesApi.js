import { ALL_MOVIES } from "./config";

export class Api {
  constructor(configApi) {
    this._url = configApi.baseUrl; // тело конструктора
    this._headers = configApi.headers;
  }

  getMovies() {
    return fetch(this._url, {
      headers: this._headers,
    }).then(this._checkResponsPromise);
  }

  // Проверка работы промиса =================================================
  _checkResponsPromise(res) {
    return res.ok
      ? res.json()
      : Promise.reject(
          console.log(`Ошибка № ${res.status}  Текст ошибки: ${res.statusText}`)
        );
  }
}

// + Запрос к Api ============================================================
const api = new Api({
  baseUrl: ALL_MOVIES,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
