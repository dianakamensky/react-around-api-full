import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const editAvatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(editAvatarRef.current.value);
  }

  return (
    <PopupWithForm
      title="Change Profile Picture"
      name="changeAvatar"
      isOpen={isOpen}
      onClose={onClose}
      submitText="Save"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_info_link"
        type="url"
        placeholder="Image link"
        name="avatar"
        ref={editAvatarRef}
        required
      />
      <p className="popup__input-error"></p>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
