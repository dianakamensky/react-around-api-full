import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Edit Profile"
      formName="editProfile"
      isOpen={isOpen}
      submitText="Save"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        className="popup__input popup__input_info_name"
        type="text"
        value={name || ''}
        onChange={handleNameChange}
        placeholder="Name"
        name="name"
        minLength="2"
        maxLength="40"
        required
      />
      <p className="popup__input-error"></p>
      <input
        className="popup__input popup__input_info_job"
        type="text"
        value={description || ''}
        onChange={handleDescriptionChange}
        placeholder="About me"
        name="about"
        minLength="2"
        maxLength="200"
        required
      />
      <p className="popup__input-error"></p>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
