// @todo: Темплейт карточки
import { deleteCardOnServer, putLikeCard, deleteLikeCard} from "./api";
const template = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
export function createCard(card, userId, openImg, deletedCard, likeBtns) {
    const callCard = template.querySelector('.card').cloneNode(true);
    const deleteButton = callCard.querySelector('.card__delete-button');
    const cardImg = callCard.querySelector(".card__image");
    const cardTitle = callCard.querySelector(".card__title");
    const likeButton = callCard.querySelector(".card__like-button");
    const iconLikeValue = callCard.querySelector('.current-value-likes'); 
    const likes = card.likes
    const likesCount = likes.length;
    iconLikeValue.textContent = likesCount;
    cardImg.src = card.link;
    cardImg.alt = card.name;
    cardTitle.textContent = card.name;
    cardImg.addEventListener("click", () => {
        openImg(card.name, card.link)
    });
    //deleteButton.addEventListener('click', event => deletedCard(event));
    const userCardId = card.owner['_id'];
    const cardId = card._id;
    if(userId === userCardId) {
        deleteButton.addEventListener('click',(callCard) => {
            deletedCard(callCard, cardId) 
      })
    } else {
        deleteButton.remove();
    }
    if (likes.some(like => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    } 
    likeButton.addEventListener('click', () => {
        const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? deleteLikeCard : putLikeCard;
      likeMethod(cardId) 
        .then((res) => { 
          likeBtns(likeButton, res, iconLikeValue); 
          card.likes = res.likes; 
        }) 
        .catch((err) => { 
        console.log(err); 
        })
    })
    return callCard;
};
// @todo: Функция удаления карточки 

export function deletedCard(card, cardId) {
    deleteCardOnServer(cardId)
      .then(() => {
        card.target.closest('.places__item').remove()
      })
      .catch((err) => {
        console.log('Ошибка, запрос не выполнен', err)
      })
};

export function likeBtns(like, res, icon) {
    like.classList.toggle("card__like-button_is-active");
    const likes = res.likes;
    const likesCount = likes.length;
    icon.textContent = likesCount;
};


// @todo: Вывести карточки на страницу


