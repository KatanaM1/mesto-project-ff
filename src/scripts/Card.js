// @todo: Темплейт карточки
export const template = document.querySelector('#card-template').content;

// @todo: DOM узлы
export const placesList = document.querySelector('.places__list');
const placesItem = document.querySelector('.places__item card');
// @todo: Функция создания карточки
export function visibilityCards(name, link, deletedCard, likeBtns, openImg) {
    const callCard = template.querySelector('.card').cloneNode(true);
    const deleteButton = callCard.querySelector('.card__delete-button');
    callCard.querySelector('.card__image').src = link;
    callCard.querySelector('.card__image').alt = name;
    callCard.querySelector('.card__title').textContent = name;
    callCard.querySelector('.card__like-button').addEventListener("click", likeBtns);
    callCard.querySelector('.card__title').textContent = name;
    callCard.querySelector('.card__image').addEventListener("click", function() {openImg(name, link)});
    deleteButton.addEventListener('click', event => deletedCard(event));
    return callCard;
};// @todo: Функция удаления карточки 
export function deletedCard(event) {
    const listItem = event.target.closest('.card');
    listItem.remove();
};

export function likeBtns(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
};

// @todo: Вывести карточки на страницу


