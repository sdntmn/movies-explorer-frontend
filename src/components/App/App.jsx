import { Routes, Route, useNavigate } from "react-router-dom";
import { React, useState, useEffect, useCallback } from "react";
// Компоненты ========================================
import ProtectedRoute from "../../contexts/ProtectedRoute";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../Page404/Page404";
import Header from "../Header/Header";
import LinkProfile from "../LinkProfile/LinkProfile";
import Navigation from "../Navigation/Navigation";
import * as mainApi from "../../utils/mainApi";
import api from "../../utils/moviesApi";

import { BASE_URL } from "../../utils/config";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const App = function () {
  const [currentUser, setCurrentUser] = useState({});
  // Зарегестрирован или нет пользователь
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Для preloader загрузились или нет данные
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // Состояние стрницы профиля в режиме редактирования или просмотра
  const [isEdit, setIsEdit] = useState(false);
  const [isErrorLoaderMovies, setIsErrorLoaderMovies] = useState();
  const [message, setMessage] = useState("");

  // ОБРАБОТКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ, РЕГИСТРАЦИЯ, АВТОРИЗАЦИЯ, ВХОД и ВЫХОД ===
  // Вход пользователя
  function onLogin({ email, password }) {
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          goHome();
          localStorage.setItem("jwt", res.token);
          localStorage.setItem("lastSearch", isLastData);
        }
      })
      .catch((error) => {
        console.log(`Ошибка данных ${error}`);
      });
  }

  // Выход пользователя
  function onSignOut() {
    localStorage.removeItem("jwt");
    outHome();
    setIsEdit(false); // Todo ?
  }

  // получение данных пользователя
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getDataUser()
        .then((currentUser) => {
          setCurrentUser(currentUser);
          setIsMoviesLoading(true);
        })
        .catch((error) => {
          console.log(`Ошибка получения данных ${error}`);
        });

      setIsErrorLoaderMovies();
    }
  }, [isLoggedIn]);

  const navigate = useNavigate();
  // Перенаправление на домашнюю страницу /movies
  const goHome = () =>
    navigate("/movies", {
      replace: true,
      state: setIsLoggedIn(true),
    });
  // Перенаправление на домашнюю страницу /login
  const outHome = () =>
    navigate("/login", {
      replace: true,
      state: setIsLoggedIn(false),
    });

  // Регистрация нового пользователя
  function onRegister({ name, email, password }) {
    return mainApi
      .register({ name, email, password })
      .then((res) => {
        goHome();
        return res;
      })
      .catch((error) => {
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");

        if (error.status === 400) {
          return console.log("не передано одно из полей");
        }
      })
      .finally(() => {});
  }

  const authToken = async (jwt) => {
    return mainApi
      .getToken(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(`Ошибка данных ${error}`);
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authToken(jwt); //функция авторизации
    }
  });

  // Исправление(смена) данных пользователя
  function handleUpdateUser(data) {
    mainApi
      .changeDataUser(data)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
        handleEditStateNotActive();
      })
      .catch((error) => {
        console.log(`Ошибка получения данных ${error}`);
      });
  }

  // ОБРАБОТКА ДАННЫХ и ФИЛЬТРАЦИЯ ФИЛЬМОВ =====================================
  // Весь полученный массив фильмов
  const [arrayMovies, setArrayMovies] = useState([]);
  // Массив фильмов последнего запроса
  const [arrayLastSearchMovies, setArrayLastSearchMovies] = useState([]);
  // Массив фильмов последнего запроса короткометражек
  const [arrayLastSearchMoviesShortFilm, setArrayLastSearchMoviesSortFilm] =
    useState([]);
  // Массив сохраненных фильмов
  const [arraySaveMovies, setArraySaveMovies] = useState("");
  // Поиск
  const [inputMovies, setInputMovies] = useState("");
  // Послендний запрос в поике фильмов
  const [isLastData, setIsLastData] = useState("");

  // Фильтр является ли фильм короткометражным
  const filterDuration = useCallback((movie) => {
    if (Number.isFinite(movie.movieId) && movie.duration <= 40) {
      return true;
    }
    return false;
  }, []);

  // Обработчик изменения инпута обновляет стейт
  function handleInputMoies(evt) {
    setInputMovies(evt.target.value);
  }
  const filterInputData = useCallback(
    (movie) => {
      if (
        movie.nameRU
          .toLowerCase()
          .trim()
          .includes(inputMovies.toLowerCase().trim())
      ) {
        return true;
      }
      return false;
    },
    [inputMovies]
  );

  const [isLoadingSaveMovies, setIsLoadingSaveMovies] = useState(false);
  // Получить список сохраненных фильмов User (GET)  =
  useEffect(() => {
    if (isLoggedIn) {
      setIsMoviesLoading(true);
      mainApi
        .getSaveMovies()
        .then((movies) => {
          setArraySaveMovies(movies);
          setIsLoadingSaveMovies(true);
        })
        .catch((error) => {
          console.log(`Ошибка получения данных ${error}`);
        });
    }
  }, [isLoggedIn]);

  // Получение массива фильмов авторизированным User
  useEffect(() => {
    if (isLoggedIn && isLoadingSaveMovies) {
      let arrMovies;
      let arrMoviesLastData;
      let arrMoviesLastDataShortFilm;
      setIsLastData(localStorage.getItem("lastSearch"));

      api
        .getMovies()
        .then((res) => {
          arrMovies = res.map((item) => {
            return {
              country: item.country,
              director: item.director,
              duration: item.duration,
              year: item.year,
              description: item.description,
              image: `${BASE_URL}${item.image.url}`,
              trailer: item.trailerLink,
              thumbnail: `${BASE_URL}${item.image.formats.thumbnail.url}`,
              movieId: item.id,
              nameRU: item.nameRU,
              nameEn: item.nameEN,
            };
          });

          setArrayMovies(arrMovies);
          console.log(isLastData.length);

          if (isLastData.length !== 0) {
            arrMoviesLastData = arrMovies.filter((item) => {
              return item.nameRU.includes(isLastData);
            });
            arrMoviesLastDataShortFilm =
              arrMoviesLastData.filter(filterDuration);
            setIsMoviesLoading(true);
            setArrayLastSearchMovies(arrMoviesLastData);
            setArrayLastSearchMoviesSortFilm(arrMoviesLastDataShortFilm);
          }
        })

        .catch((error) => setIsErrorLoaderMovies(error))
        .finally(() => setIsMoviesLoading(false));
    }
  }, [filterDuration, isLastData, isLoadingSaveMovies, isLoggedIn]);

  // Сохранение фильма в коллекцию

  function handleAddMovie(movies) {
    const stateSave = arraySaveMovies.some((n) => n.movieId === movies.movieId);

    if (!stateSave) {
      mainApi
        .setMoviesUser({
          country: movies.country || "Нет данных",
          director: movies.director || "Нет данных",
          duration: movies.duration || "Нет данных",
          year: movies.year || "Нет данных",
          description: movies.description || "Нет данных",
          image: movies.image || "Нет данных",
          trailer: movies.trailer,
          thumbnail: movies.thumbnail,
          movieId: movies.movieId,
          nameEN: movies.nameEN || "Нет данных",
          nameRU: movies.nameRU || "Нет данных",
        })
        .then((movie) => {
          setArraySaveMovies((state) => [movie, ...state]);
        })
        .catch((error) => {
          console.log(`Ошибка данных карточки ${error}`);
        });
    }
  }

  // Удаление фильма из коллекции и перенаправление на сохранение если нет в коллекции
  function handleCardDelete(movie) {
    let stateInCollection = arraySaveMovies.some(
      (el) => el.movieId === movie.movieId
    );

    // true - в коллекции
    if (stateInCollection) {
      // Находим и присваиваем сохраненный фильм с _id
      let movieSaveId = arraySaveMovies.find(
        (n) => n.movieId === movie.movieId
      );
      mainApi
        .deleteMovieUser(movieSaveId._id)
        .then(() => {
          setArraySaveMovies((state) =>
            state.filter((m) => m._id !== movieSaveId._id)
          );
        })
        .catch((error) => {
          console.log(`Ошибка удаления карточки ${error}`);
        });
    } else {
      handleAddMovie(movie);
    }
  }

  const handleEditStateActive = useCallback(() => {
    setIsEdit(true);
  }, []);

  const handleEditStateNotActive = useCallback(() => {
    setIsEdit(false);
  }, []);

  const handleNavClick = useCallback(() => {
    setIsPopupOpen(true);
  }, []);

  const closeAllPopups = useCallback(() => {
    setIsPopupOpen(false);
    setIsEdit(false);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`root ${isPopupOpen && "root__color"}`}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  styleAuth={`${isLoggedIn ? "header__profile" : "header"}`}
                  styleHeader="root__cover"
                  isLoggedIn={isLoggedIn}
                  visible={isPopupOpen}
                  onClose={closeAllPopups}
                  isOpen={handleNavClick}
                >
                  {!isLoggedIn ? (
                    <>
                      <div className="header__nav">
                        <Navigation
                          pathLink="/register"
                          styles="header__link"
                          textLink="Регистрация"
                        />
                        <Navigation
                          pathLink="/login"
                          styles="header__button root__color-green"
                          textLink="Войти"
                        />
                      </div>
                    </>
                  ) : (
                    <LinkProfile pathLink="/profile" />
                  )}
                </Header>
                <Main />
              </>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                {
                  <>
                    <Header
                      styleAuth={`${isLoggedIn ? "header__profile" : "header"}`}
                      isLoggedIn={isLoggedIn}
                      visible={isPopupOpen}
                      onClose={closeAllPopups}
                      isOpen={handleNavClick}
                    >
                      <LinkProfile
                        onClose={closeAllPopups}
                        isEditState={isEdit}
                        pathLink="/profile"
                      />
                    </Header>
                    <Profile
                      isEditState={isEdit}
                      isNotActive={handleEditStateNotActive}
                      isActive={handleEditStateActive}
                      onEndSession={onSignOut}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                    />
                  </>
                }
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isLoader={isMoviesLoading}
              >
                <>
                  <Header
                    styleAuth={`${isLoggedIn ? "header__profile" : "header"}`}
                    isLoggedIn={isLoggedIn}
                    visible={isPopupOpen}
                    onClose={closeAllPopups}
                    isOpen={handleNavClick}
                  >
                    <LinkProfile pathLink="/profile" />
                  </Header>
                  <Movies
                    isOpen={handleNavClick}
                    arrayMovies={arrayMovies}
                    isMoviesLoading={isMoviesLoading}
                    setArrayLastSearchMovies={setArrayLastSearchMovies}
                    lastData={arrayLastSearchMovies}
                    lastDataShortFilms={arrayLastSearchMoviesShortFilm}
                    arraySaveMovies={arraySaveMovies}
                    shortFilms={filterDuration}
                    setInputMovies={setInputMovies}
                    inputMovies={inputMovies}
                    handleInputMoies={handleInputMoies}
                    filterInputData={filterInputData}
                    handleAddMovie={handleAddMovie}
                    setArraySaveMovies={setArraySaveMovies}
                    deletMovie={handleCardDelete}
                  />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                {
                  <>
                    <Header
                      styleAuth={`${isLoggedIn ? "header__profile" : "header"}`}
                      isLoggedIn={isLoggedIn}
                      visible={isPopupOpen}
                      onClose={closeAllPopups}
                      isOpen={handleNavClick}
                    >
                      <LinkProfile pathLink="/profile" />
                    </Header>
                    <SavedMovies
                      isOpen={handleNavClick}
                      arraySaveMovies={arraySaveMovies}
                      lastData={arrayLastSearchMovies}
                      shortFilms={filterDuration}
                      setInputMovies={setInputMovies}
                      inputMovies={inputMovies}
                      handleInputMoies={handleInputMoies}
                      filterInputData={filterInputData}
                      deletMovie={handleCardDelete}
                    />
                  </>
                }
              </ProtectedRoute>
            }
          />

          <Route path="not-found" element={<PageNotFound />} />
          <Route
            path="register"
            element={
              <>
                <Header styleAuth="header__auth" />
                <Register onRegister={onRegister} />
              </>
            }
          />
          <Route
            path="login"
            element={
              <>
                <Header styleAuth="header__auth" />
                <Login onLogin={onLogin} />
              </>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
