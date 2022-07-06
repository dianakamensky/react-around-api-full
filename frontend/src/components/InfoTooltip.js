import React from 'react';
import V from '../images/v.svg';
import X from '../images/x.svg';

function InfoTooltip({ isOpen, success, onClose }) {
  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
      <div className="popup__message">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <img className="popup__icon-image" src={success ? V : X}></img>
        <p className="popup__register-message">
          {success
            ? 'Success! You have now been registered.'
            : 'Oops, something went wrong! Please try again.'}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
