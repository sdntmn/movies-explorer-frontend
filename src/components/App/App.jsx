//class App
//const App
// import { Routes, Route } from "react-router-dom";
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
import Preloader from "../Preloader/Preloader";

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
  // Послендний запрос в поике фильмов
  const [isLastData, setIsLastData] = useState("");

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
  // Массив сохраненных фильмов
  const [arraySaveMovies, setArraySaveMovies] = useState("");
  // Массив сохраненых MovieId фильмов
  const [arrayMovieIdSaveMovies, setArrayMovieIdSaveMovies] = useState([]);

  // Фильтр является ли фильм короткометражным

  const filterDuration = useCallback((movie) => {
    if (Number.isFinite(movie.movieId) && movie.duration <= 45) {
      return true;
    }
    return false;
  }, []);

  // Фильтрация массива и установка состояния фильма.  В коллекции state -да True или нет - False
  const putsState = useCallback(() => {
    let filterResultSave = arrayMovies.filter((movie) => {
      let stateInCollection = arrayMovieIdSaveMovies.some(
        (el) => el === movie.movieId
      );
      movie.state = stateInCollection;
      return movie;
    });

    setArrayMovies(filterResultSave);
  }, [arrayMovieIdSaveMovies, arrayMovies]);

  // получение списка фильмов
  useEffect(() => {
    if (isLoggedIn) {
      let arrMovies;
      let arrMoviesLastData;
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
          if (isLastData.length !== null) {
            arrMoviesLastData = arrMovies.filter((item) => {
              return item.nameRU.includes(isLastData);
            });
            setArrayLastSearchMovies(arrMoviesLastData);
          }
        })

        .catch((error) => setIsErrorLoaderMovies(error))
        .finally(() => setIsMoviesLoading(false));
    }
  }, [isLastData, isLoggedIn]);

  /*
  const filterState = useCallback(
    (movie) => {
      const stateInCollection = arrayMovieIdSaveMovies.some(
        (el) => el === movie.movieId
      );

      movie.state = stateInCollection;

      return movie;
    },
    [arrayMovieIdSaveMovies]
  );
  */

  // Сохранение фильма в коллекцию =========================================

  function handleAddMovie(movies) {
    if (movies._id === undefined) {
      const movieId = arraySaveMovies.find((n) => n.movieId === movies.movieId);
      console.log(movieId);
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
          console.log(movie);
          setArraySaveMovies((state) =>
            state.filter((m) => m._id !== movie._id)
          );
          //filterState(movie);
          //setIsSavedStateMovies(true);
        })
        .catch((error) => {
          console.log(`Ошибка данных карточки ${error}`);
        });
    }

    console.log("уже в коллекции");
  }

  // Удаление фильма из коллекции ============================================
  function handleCardDelete(movie) {
    if (movie._id === undefined) {
      const movieId = arraySaveMovies.find((n) => n.movieId === movie.movieId);

      mainApi
        .deleteMovieUser(movieId._id)
        .then(() => {
          setArraySaveMovies((state) =>
            state.filter((m) => m._id !== movieId._id)
          );
        })
        .catch((error) => {
          console.log(`Ошибка удаления карточки ${error}`);
        });
    } else {
      mainApi
        .deleteMovieUser(movie._id)
        .then(() => {
          setArraySaveMovies((state) =>
            state.filter((m) => m._id !== movie._id)
          );
        })
        .catch((error) => {
          console.log(`Ошибка удаления карточки ${error}`);
        });
    }
  }

  // Получить список сохраненных фильмов User (GET)  =========================================
  useEffect(() => {
    mainApi
      .getSaveMovies()
      .then((movies) => {
        setArraySaveMovies(movies);
        setArrayMovieIdSaveMovies(
          movies.map(function (number) {
            return number.movieId;
          })
        );
      })
      .catch((error) => {
        console.log(`Ошибка получения данных ${error}`);
      });
  }, []);

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

  // Обработчик изменения инпута обновляет стейт
  const [inputMovies, setInputMovies] = useState("");
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
                    putsState={putsState}
                    setArrayLastSearchMovies={setArrayLastSearchMovies}
                    setArraySaveMovies={setArraySaveMovies}
                    isMoviesLoading={isMoviesLoading}
                    arrayMovieIdSaveMovies={arrayMovieIdSaveMovies}
                    arrayMovies={arrayMovies}
                    isOpen={handleNavClick}
                    lastData={arrayLastSearchMovies}
                    onAddCollecnion={handleAddMovie}
                    arraySaveMovies={arraySaveMovies}
                    shortFilms={filterDuration}
                    setInputMovies={setInputMovies}
                    inputMovies={inputMovies}
                    handleInputMoies={handleInputMoies}
                    filterInputData={filterInputData}
                    handleCardDelete={handleCardDelete}
                    //isSavedStateMovies={isSavedStateMovies}
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
                      arraySaveMovies={arraySaveMovies}
                      setArrayLastSearchMovies={setArrayLastSearchMovies}
                      isOpen={handleNavClick}
                      lastData={arrayLastSearchMovies}
                      arrayMovies={arrayMovies}
                      shortFilms={filterDuration}
                      setInputMovies={setInputMovies}
                      inputMovies={inputMovies}
                      handleInputMoies={handleInputMoies}
                      filterInputData={filterInputData}
                      deletMovie={handleCardDelete}

                      //isSavedStateMovies={isSavedStateMovies}
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
