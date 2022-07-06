import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Logo from "../images/Vector.svg";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, withRouter, useLocation } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";

function App(props) {
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] =
    React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [navText, setNavText] = React.useState("");
  const [navLink, setNavLink] = React.useState("");
  const location = useLocation();

  React.useEffect(initCurrentUser, []);

  React.useEffect(getCards, []);

  React.useEffect(initLoggedIn, [location.pathname, props.history]);

  React.useEffect(initNavText, [location.pathname]);

  function initNavText() {
    if (location.pathname === "/") {
      setNavText("Log Out");
      setNavLink("/login");
    } else if (location.pathname === "/login") {
      setNavText("Sign up");
      setNavLink("/register");
    } else if (location.pathname === "/register") {
      setNavText("Log in");
      setNavLink("/login");
    }
  }

  function initLoggedIn() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(res.data.email);
            props.history.push("/");
          } else setLoggedIn(false);
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
        });
    } else setLoggedIn(false);
  }

  function initCurrentUser() {
    api
      .getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((error) => console.log(error));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .updateCardLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.log(`Error liking card: ${err}`));
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((c) => c._id !== cardId));
      })
      .catch((error) => console.log(error));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddLocationClick() {
    setAddPlacePopupState(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleUpdateUser(info) {
    api
      .saveProfile(info)
      .then((response) => setCurrentUser(response))
      .then(closeAllPopups)
      .catch((error) => console.log(error));
  }

  function handleUpdateAvatar(link) {
    api
      .saveAvatar(link)
      .then((response) => setCurrentUser(response))
      .then(closeAllPopups)
      .catch((error) => console.log(error));
  }

  function handleAddPlaceSubmit(info) {
    api
      .saveLocation(info)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(closeAllPopups)
      .catch((error) => console.log(error));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupState(false);
    setEditAvatarPopupState(false);
    setSelectedCard(null);
  }

  function getCards() {
    api
      .getInitialCards()
      .then(setCards)
      .catch((err) => window.alert(`Error loading initial cards: ${err}`));
  }

  function handleLogin() {
    setLoggedIn();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        img={Logo}
        alt="Around the U.S"
        loggedIn={loggedIn}
        navLink={navLink}
        navText={navText}
      />
      <Switch>
        <Route path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <ProtectedRoute
          loggedIn={loggedIn}
          exact
          path="/"
          component={Main}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddLocationClick}
          onEditAvatarClick={handleEditAvatarClick}
          setSelectedCard={setSelectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
      </Switch>
      <Footer footerCR={`© ${new Date().getFullYear()} Around The U.S`} />
      <ImagePopup
        onClose={closeAllPopups}
        image={selectedCard?.link}
        caption={selectedCard?.name}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
