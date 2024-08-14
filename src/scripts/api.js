const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
    headers: {
      authorization: "97c087f4-5701-4c54-b3e0-9c873077734e",
      "Content-Type": "application/json",
    },
    likesPath: "likes",
};

export const checkRequest = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); 
};
  
export const getDataProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(checkRequest);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
      .then(checkRequest)
};
  
  
export function editProfileInfo({ name, about }) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(checkRequest);
};
  
export function postCard(initialCard) {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: initialCard.name,
        link: initialCard.link,
      }),
    }).then(checkRequest);
};
  
export function deleteCardOnServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(checkRequest);
};
  
export function putLikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers
    }).then(checkRequest);
};
  
export function deleteLikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(checkRequest);
};
  
export function editAvatar(linkAvatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: linkAvatar
      }),
    }).then(checkRequest);
};
