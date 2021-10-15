export function setLocalStorage(key, value) {
  if (typeof value !== "string") {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    window.localStorage.setItem(key, value);
  }
}

export function removeLocalStorage(key) {
  window.localStorage.removeItem(key);
}

export function getLocalStorage(key) {
  const val = window.localStorage.getItem(key);
  return val ? val : null;
}
