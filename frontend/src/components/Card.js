import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardLike, onCardDelete, setSelectedCard }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = card.likes.some((user) => user === currentUser._id);

  function deleteCard() {
    onCardDelete(card._id);
  }

  function openPopup() {
    setSelectedCard(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  const isOwn = card.owner === currentUser._id;

  return (
    <article className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={openPopup}
      />
      {isOwn && (
        <button
          type="button"
          className="card__delete-btn"
          onClick={deleteCard}
        ></button>
      )}
      <div className="card__caption-container">
        <h2 className="card__caption">{card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={`card__like-btn ${
              isLiked ? "card__like-btn_active" : ""
            }`}
            onClick={handleLikeClick}
          ></button>
          <div className="card__likes">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
