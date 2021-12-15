const saveToLocalStorage = (data, strName) => {
  localStorage.setItem(strName,JSON.stringify(data));
}

const loadFromLocalStorage = (strName) => {
  const res = JSON.parse((localStorage.getItem(strName)));
  return res;
}

const removeFromLocalStorage = (strName) => {
  localStorage.removeItem(strName);
}

export {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage
}