// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
export function createCard(name, link, deletedCard, likeBtns, openImg) {
    const callCard = template.querySelector('.card').cloneNode(true);
    const deleteButton = callCard.querySelector('.card__delete-button');
    callCard.querySelector('.card__image').src = link;
    callCard.querySelector('.card__image').alt = name;
    callCard.querySelector('.card__title').textContent = name;
    callCard.querySelector('.card__like-button').addEventListener("click", likeBtns);
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


