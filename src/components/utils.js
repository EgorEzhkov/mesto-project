
export function renderLoading(isLoading, textLoading, textLoadingEnd, button) {
  if (isLoading) {
    button.textContent = textLoading
  } else {
    button.textContent = textLoadingEnd
  }
}
