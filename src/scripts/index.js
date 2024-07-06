import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deletedCard, likeBtns} from './сard.js';
import { openModal, closeModal } from './modal.js';

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
const cardElement = document.forms.new_place;
const cardTitle = cardElement.elements.place_name;
const cardImgLink = cardElement.elements.link;
const popupTypeImage = document.querySelector('.popup_type_image');
const popuImageLink = popupTypeImage.querySelector('.popup__image');
const popupImageName = popupTypeImage.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');

function fillForm() {
    formEditProfile.name.value = profileTitle.textContent;
    formEditProfile.description.value = profileDscrp.textContent;
};

initialCards.forEach(function(item) {
    placesList.append(createCard(item.name, item.link, deletedCard, likeBtns, openImg));
});

profileEditTarget.addEventListener("click", function () { 
    openModal(popupTypeEdit); 
    fillForm();
});

addButton.addEventListener("click", function () { 
    openModal(popupNewCard); 
});

popupCloseButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener("click", () =>
    closeModal(popup));
});

function EditProfileFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDscrp.textContent = jobInput.value;
    closeModal(popupTypeEdit);
};

formEditProfile.addEventListener('submit', EditProfileFormSubmit); 

function newCardFormSubmit(evt) {
    evt.preventDefault(); 
    const newElement = {
        name: cardTitle.value,
        link: cardImgLink.value
    }; 
    const element = createCard(newElement.name, newElement.link, deletedCard, likeBtns, openImg);
    placesList.prepend(element);
    cardElement.reset();
    closeModal(popupNewCard);
};
  
cardElement.addEventListener('submit', newCardFormSubmit); 

function openImg(name, link) {
    popuImageLink.src = link;
    popuImageLink.alt = name;
    popupImageName.textContent = name;
    openModal(popupTypeImage);
};


