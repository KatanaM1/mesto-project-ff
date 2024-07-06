import '../pages/index.css';
import { initialCards } from './cards.js';
import { visibilityCards, deletedCard, placesList, likeBtns} from './Card.js';
import { openModal, closeModal } from './modal.js';

const modalElem = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupClose = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formElement = document.forms.edit_profile;
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTittle = document.querySelector('.profile__title');
const profileDscrp = document.querySelector('.profile__description');
const cardElement = document.forms.new_place;
const cardTittle = cardElement.elements.place_name;
const cardImgform = cardElement.elements.link;
const popupButton = document.querySelectorAll('.popup__button');
const popupTypeImage = document.querySelector('.popup_type_image');
const popuImageLink = popupTypeImage.querySelector('.popup__image');
const popupImageName = popupTypeImage.querySelector('.popup__caption');


initialCards.forEach(function(item) {
    placesList.append(visibilityCards(item.name, item.link, deletedCard, likeBtns, openImg));
});

modalElem.addEventListener("click", function () { 
    openModal(popupTypeEdit); 
});

addButton.addEventListener("click", function () { 
    openModal(popupNewCard); 
});

popupClose.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener("click", () =>
    closeModal(popup));
});

popupButton.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener("click", () =>
    closeModal(popup));
});

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileTittle.textContent = nameInput.value;
    profileDscrp.textContent = jobInput.value;
    formElement.reset();
};

formElement.addEventListener('submit', handleFormSubmit); 

function newCardFormSubmit(evt) {
    evt.preventDefault(); 
    const newElement = {
        name: cardTittle.value,
        link: cardImgform.value
    }; 
    const Element = visibilityCards(newElement.name, newElement.link, deletedCard, likeBtns, openImg);
    placesList.prepend(Element);
    cardElement.reset();
};
  
cardElement.addEventListener('submit', newCardFormSubmit); 

function openImg(name, link) {
    popuImageLink.src = link;
    popuImageLink.alt = name;
    popupImageName.textContent = name;
    openModal(popupTypeImage);
};


