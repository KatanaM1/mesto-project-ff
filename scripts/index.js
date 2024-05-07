// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesItem = document.querySelector('.places__item card');
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function visibilityCards(name, link, deletedCard) {
    const callCard = template.querySelector('.card').cloneNode(true);
    callCard.querySelector('.card__image').src = link;
    callCard.querySelector('.card__image').alt = name;
    callCard.querySelector('.card__title').textContent = name;
    const deleteButton = callCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', event => deletedCard(event));
    return callCard;
};

// @todo: Функция удаления карточки 
function deletedCard(event) {
    const listItem = event.target.closest('.card');
    listItem.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
    placesList.append(visibilityCards(item.name, item.link, deletedCard));
});