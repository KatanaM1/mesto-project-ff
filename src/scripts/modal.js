export function openModal(popupElement) {
    popupElement.classList.add('popup_is-animated');
    setTimeout(() => { popupElement.classList.add("popup_is-opened");}, 0);
    popupElement.addEventListener('click', closePopupTarget);
    document.addEventListener('keydown', closePopupEsc);
};

export function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    setTimeout(() => { popupElement.classList.remove("popup_is-animated");}, 600);
    popupElement.removeEventListener('click', closePopupTarget);
    document.removeEventListener('keydown', closePopupEsc);
};

function closePopupTarget(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
};

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};

