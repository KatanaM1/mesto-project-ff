import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deletedCard, likeBtns } from './сard.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { editProfileInfo, getDataProfile, getInitialCards, postCard, editAvatar } from "./api.js";
import { renderLoading } from './utils.js';


const profileEditTarget = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formEditProfile = document.forms.edit_profile;
const nameInput = formEditProfile.elements.name;//document.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.elements.description;//document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDscrp = document.querySelector('.profile__description');
const cardFromNewPlace = document.forms.new_place;
const namePlaceInput = cardFromNewPlace.querySelector('.popup__input_type_card-name');
const linkPlaceInput = cardFromNewPlace.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popuImageLink = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
const avatarForm = document.forms["avatar"];
const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarInput = avatarForm.querySelector('.popup__input_type_url');
const profileAvatar = document.querySelector('.profile__image');

function fillProfileForm() {
  formEditProfile.name.value = profileTitle.textContent;
  formEditProfile.description.value = profileDscrp.textContent;
};

function openImg(name, link) {
  openModal(popupTypeImage);
  popuImageLink.src = link;
  popuImageLink.alt = name;
  popupImageName.textContent = name;
};

profileEditTarget.addEventListener("click", function () {
  openModal(popupTypeEdit);
  fillProfileForm();
  clearValidation(popupTypeEdit, validationConfig);
});

addButton.addEventListener("click", function () {
  openModal(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
});

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener("click", () =>
    closeModal(popup));
});

function editProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  editProfileInfo({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((info) => {
      profileTitle.textContent = info.name;
      profileDscrp.textContent = info.about;
      closeModal(popupTypeEdit);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(false, evt);
    })
};

formEditProfile.addEventListener("submit", editProfileFormSubmit);

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  editAvatar(avatarInput.value)
    .then((result) => {
      profileAvatar.setAttribute("style", `background-image: url('${result.avatar}')`);
      closeModal(popupAvatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, evt);
    })
};

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

function newCardFormSubmit(evt) {
  evt.preventDefault();
  const newElement = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value
  };
  renderLoading(true, evt);
  postCard(newElement)
    .then((res) => {
      placesList.prepend(createCard(res, res.owner._id, openImg, deletedCard, likeBtns));
      closeModal(popupNewCard);
      evt.target.reset();
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(false, evt);
    })

};

cardFromNewPlace.addEventListener('submit', newCardFormSubmit);

enableValidation(validationConfig);

Promise.all([getDataProfile(), getInitialCards()]).then(
  ([info, initialCards]) => {
    initialCards.forEach((card) => {
      placesList.append(createCard(card, info._id, openImg, deletedCard, likeBtns));
    });
    profileTitle.textContent = info.name;
    profileDscrp.textContent = info.about;
    profileAvatar.setAttribute("style", `background-image: url('${info.avatar}')`);
  })
  .catch((err) => {
    console.log(err);
  })

profileAvatar.addEventListener('click', function () {
  clearValidation(popupAvatar, validationConfig);
  openModal(popupAvatar);
});



