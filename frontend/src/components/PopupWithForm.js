import React from 'react';

function PopupWithForm({
  isOpen,
  onClose,
  title,
  formName,
  onSubmit,
  children,
  submitText,
}) {
  const formRef = React.useRef();

  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    setIsValid(formRef.current.checkValidity());
  });

  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
      <div className="popup__message">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={formName}
          onSubmit={onSubmit}
          ref={formRef}
        >
          {children}
          <button
            type="submit"
            className={`popup__submit-btn ${
              isValid && 'popup__submit-btn_active'
            }`}
          >
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
