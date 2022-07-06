import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [caption, setCaption] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: caption,
      link,
    });
  }

  function handleCaptionChange(e) {
    setCaption(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setCaption('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Add Location"
      name="addLocation"
      isOpen={isOpen}
      submitText="Create"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        className="popup__input popup__input_info_title"
        type="text"
        placeholder="Title"
        onChange={handleCaptionChange}
        value={caption}
        name="caption"
        minLength="1"
        maxLength="30"
        required
      />
      <p className="popup__input-error"></p>
      <input
        className="popup__input popup__input_info_link"
        type="url"
        placeholder="Image link"
        onChange={handleLinkChange}
        value={link}
        name="link"
        required
      />
      <p className="popup__input-error"></p>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
