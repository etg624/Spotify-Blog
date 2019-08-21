export const setItemInLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getItemFromLocalStorage = localStorageKey => {
  return localStorage.getItem(localStorageKey);
};
