
export function renderLoading(isLoading, textLoading, textLoadingEnd, button) {
  if (isLoading) {
    button.textContent = textLoading
  } else {
    button.textContent = textLoadingEnd
  }
}

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}
