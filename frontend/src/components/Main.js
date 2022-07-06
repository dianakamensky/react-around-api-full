import React from "react";
import addIcon from "../images/addicon.svg";
import editIcon from "../images/editicon.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  setSelectedCard,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Profile picture"
          />
          <div
            className="profile__edit-avatar-container"
            onClick={onEditAvatarClick}
          >
            <img
              className="profile__edit-avatar"
              src={editIcon}
              alt="Edit avatar"
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-btn"
              aria-label="Edit profile"
              onClick={onEditProfileClick}
            >
              <img
                className="profile__edit-icon"
                src={editIcon}
                alt="Edit profile"
              />
            </button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          aria-label="Add location"
          onClick={onAddPlaceClick}
        >
          <img className="profile__add-icon" src={addIcon} alt="Add" />
        </button>
      </section>
      <section className="locations">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            setSelectedCard={setSelectedCard}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
