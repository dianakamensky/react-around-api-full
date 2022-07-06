function ImagePopup(props) {
  return (
    <div className={`popup location-popup ${props.image && 'popup_open'}`}>
      <div className="location-popup__main">
        <button className="popup__close-btn" onClick={props.onClose}></button>
        <img
          className="location-popup__img"
          src={props.image}
          alt={props.caption}
        />
        <h3 className="location-popup__caption">{props.caption}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
