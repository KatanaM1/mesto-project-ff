export function renderLoading(isLoading, evt) {
    if (isLoading) {
        evt.submitter.textContent = "Сохранение...";
    } else {
        evt.submitter.textContent = "Сохранить";
    }
  }