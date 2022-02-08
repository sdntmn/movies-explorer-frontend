import { SERVER_URL } from "./config";
// Проверка ответа =========================================================
export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`${res.status}`);
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
  }).then(checkResponse);
};

// Добавить фильма в коллекцию (POST) ========================================
export const setMoviesUser = (movie) => {
  return fetch(`${SERVER_URL}/movies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  }).then(checkResponse);
};

// Удаление фильма из коллекции (POST) ========================================
export const deleteMovieUser = (movieId) => {
  return fetch(`${SERVER_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: movieId,
    }),
  }).then(checkResponse);
};

// Token Get==================================
export const getToken = (token) => {
  return fetch(`${SERVER_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// Заменить данные пользователя (PATCH) ====================================
export const changeDataUser = (data) => {
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
  }).then(checkResponse);
};

// Получить данные пользователя (GET) ======================================
export const getDataUser = () => {
  return fetch(`${SERVER_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": ["application/json", "charset=utf-8"],
    },
  }).then(checkResponse);
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
  }).then(checkResponse);
};

// Авторизация пользователя Post запрос=====================================
export const authorize = (email, password) => {
  return fetch(`${SERVER_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};