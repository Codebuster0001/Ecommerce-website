// src/utils/localStorage.js
export const loadState = (key = "cart") => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

export const saveState = (key = "cart", state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    console.error("Could not save state to localStorage", state);
  }
};
