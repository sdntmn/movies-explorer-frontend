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

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [localContext, setLocalContex] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [arrayLastSearchMovies, setArrayLastSearchMovies] = useState([]);
  // Состояние сохранен или нет фильм
  //!const [isSavedStateMovies, setIsSavedStateMovies] = useState(false);
  // массив сохраненных фильмов
  const [arraySaveMovies, setArraySaveMovies] = useState("");
  // Является ли короткометражным
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [arrayMovies, setArrayMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isErrorLoaderMovies, setIsErrorLoaderMovies] = useState();
  const [message, setMessage] = useState("");

  const [isLastData, setIsLastData] = useState("");

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

  // получение данных пользователя
  useEffect(() => {
    let arrMovies;
    let arrMoviesLastData;
    setIsLastData(localStorage.getItem("lastSearch"));

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

      api
        .getMovies()
        .then((res) => {
          if (isLastData.length !== null) {
            arrMoviesLastData = arrayMovies.filter((item) => {
              return item.nameRU.includes(isLastData);
            });
            setArrayLastSearchMovies(arrMoviesLastData);
          }
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
              state: "",
            };
          });
          console.log(arrMovies);
          setArrayMovies(arrMovies);
        })

        .catch((error) => setIsErrorLoaderMovies(error))
        .finally(() => setIsMoviesLoading(false));

      console.log(isLastData);
    }
  }, [isLastData, isLoggedIn]);

  const navigate = useNavigate();
  const goHome = () =>
    navigate("/movies", {
      replace: true,
      state: setIsLoggedIn(true),
    });

  const outHome = () =>
    navigate("/login", {
      replace: true,
      state: setIsLoggedIn(false),
    });

  // Регистрация нового пользователя =======================================
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

  // Выход пользователя
  function onSignOut() {
    localStorage.removeItem("jwt");
    outHome();
    setIsEdit(false); // Todo ?
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
  /*
  const [stateInColLection, setStateInColLection] = useState(false);
  function checkStateSaveInCollection() {
    arrayMovies.map((movie) => {
      const colLection = arraySaveMovies.some((el) => el === movie.movieId);

      movie.state = colLection;

      return setStateInColLection(movie.state);
    });
  }
  console.log(stateInColLection);
  console.log(checkStateSaveInCollection());


   useEffect(() => {
     const jwt = localStorage.getItem("jwt");
     if (jwt) {
       setIsAuth(true);
       authToken(jwt); //функция авторизации
     } else {
       outHome();
     }
   }, [outHome]);
   */

  // Исправление(смена) данных пользователя=================================
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

  const filterDuration = useCallback((movie) => {
    if (Number.isFinite(movie.movieId) && movie.duration <= 45) {
      return true;
    }

    return false;
  }, []);

  // Сохранение фильма в коллекцию =========================================

  function handleAddMovie(movies) {
    const inCollection = arraySaveMovies.find(
      (movie) => movie.movieId === movies.movieId
    );
    if (!inCollection) {
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
          setArraySaveMovies((state) =>
            state.filter((m) => m._id !== movie._id)
          );
          //setIsSavedStateMovies(true);
        })
        .catch((error) => {
          console.log(`Ошибка данных карточки ${error}`);
        });
    }
    if (inCollection) {
      handleCardDelete(inCollection);
      console.log("уже в коллекции");
    }
  }

  // Удаление фильма из коллекции ============================================
  function handleCardDelete(movie) {
    console.log(movie);
    mainApi
      .deleteMovieUser(movie._id)
      .then(() => {
        setArraySaveMovies((state) => state.filter((m) => m !== movie));
        //setIsSavedStateMovies(false);
      })
      .catch((error) => {
        console.log(`Ошибка удаления карточки ${error}`);
      });
  }

  // Получить список сохраненных фильмов User (GET)  =========================================
  useEffect(() => {
    mainApi
      .getSaveMovies()
      .then((movies) => {
        setArraySaveMovies(movies);
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
                    setArrayLastSearchMovies={setArrayLastSearchMovies}
                    setArraySaveMovies={setArraySaveMovies}
                    isMoviesLoading={isMoviesLoading}
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
}
