import { SERVER_URL } from "./config";
// Проверка ответа =========================================================
export const checkRespons = (res) => {
  return res.ok ?
    res.json() :
    Promise.reject(`Ошибка № ${res.status}  Текст ошибки: ${res.statusText}`);
};

// Регистрация пользователя Post запрос=====================================
export const register = ({ name, email, password }) => {
  return fetch(`${SERVER_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkRespons);
};

// Авторизация пользователя Post запрос=====================================
export const authorize = (email, password) => {
  return fetch(`${SERVER_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkRespons);
};

// Получить данные пользователя (GET) ======================================
export const getDataUser = (dataUser) => {
  return fetch(`${SERVER_URL}/users/me `, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUser),
  }).then(checkRespons);
};

// Получить список сохраненных фильмов User (GET) ======================
export const getSaveMovies = () => {
  return fetch(`${SERVER_URL}/movies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  }).then(checkRespons);
};

// Заменить данные пользователя (PATCH) ====================================
export const changeDataUser = (data) => {
  console.log(data);
  return fetch(`${SERVER_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then(checkRespons);
};

// Добавить карточку (POST) ================================================
export const setMoviesUser = (movie) => {
  console.log();
  return fetch(`${SERVER_URL}/movies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  }).then(checkRespons);
};

// Token Get запрос данных по пользователю==================================
export const getToken = (token) => {
  return fetch(`${SERVER_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRespons);
};