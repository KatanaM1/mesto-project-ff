import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deletedCard, likeBtns} from './сard.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation} from './validation.js';
import { editProfileInfo, getDataProfile, getInitialCards, postCard, editAvatar} from "./api.js";


const profileEditTarget = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formEditProfile = document.forms.edit_profile;
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDscrp = document.querySelector('.profile__description');
const cardFromNewPlace = document.forms.new_place;
const cardTitle = cardFromNewPlace.elements.place_name;
const cardImgLink = cardFromNewPlace.elements.link;
const popupTypeImage = document.querySelector('.popup_type_image');
const popuImageLink = popupTypeImage.querySelector('.popup__image');
const popupImageName = popupTypeImage.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');
const  validationConfig = {
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
const closeAvatarPopup = popupAvatar.querySelector('.popup__close');

function fillForm() {
    formEditProfile.name.value = profileTitle.textContent;
    formEditProfile.description.value = profileDscrp.textContent;
};

function openImg(name, link) {
    popuImageLink.src = link;
    popuImageLink.alt = name;
    popupImageName.textContent = name;
    openModal(popupTypeImage);
};

//initialCards.forEach(function(item) {
 //   placesList.append(createCard(item.name, item.link, deletedCard, likeBtns, openImg));
//});

profileEditTarget.addEventListener("click", function () { 
    openModal(popupTypeEdit); 
    fillForm();
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
  const popupElement = document.querySelector(".popup_is-opened");
  renderLoading(true, popupElement);
  editProfileInfo({
    name: nameInput.value,
    about: jobInput.value,
    })
    .then((info) => {
      profileName.textContent = info.name;
      profileJob.textContent = info.about;
      closeModal(popupTypeEdit);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(false, popupElement);
    })
};

function renderLoading(isLoading, popupElement) {
    const activeButton = popupElement.querySelector(".popup__button");
    activeButton.textContent = isLoading ? "Сохранение..." : "Сохранить";
};


formEditProfile.addEventListener('submit', editProfileFormSubmit); 

closeAvatarPopup.addEventListener("click", function() {
    closeModal(popupAvatar)
});

function handleAvatarFormSubmit(evt) {
    evt.preventDefault(); 
    const popupElement = document.querySelector(".popup_is-opened");
    editAvatar(avatarInput.value)
    .then((result) => {
      profileAvatar.setAttribute("style", `background-image: url('${result.avatar}')`);
      closeModal(popupAvatar);      
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, popupElement);
    })
};

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

function editFormSubmit(evt) {
evt.preventDefault();
const popupElement = document.querySelector(".popup_is-opened");
renderLoading(true, popupElement);
editProfileInfo({
    name: nameInput.value,
    about: jobInput.value,
    })
    .then((info) => {
        profileTitle.textContent = info.name;
        profileDscrp.textContent = info.about;
        closeModal(popup);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(false, popupElement);
    })
};

formEditProfile.addEventListener("submit", editFormSubmit);

function newCardFormSubmit(evt) {
    evt.preventDefault(); 
    const newElement = {
        name: cardTitle.value,
        link: cardImgLink.value
    }; 
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
    renderLoading(false, popupAvatar);
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
    
      profileAvatar.addEventListener('click', function() {
        clearValidation(popupAvatar, validationConfig);
        openModal(popupAvatar);
});
      


