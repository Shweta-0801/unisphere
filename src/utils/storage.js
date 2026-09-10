// Tiny helper so every module reads/writes localStorage the same way.
// This is a stand-in for a real backend — swap these two functions out
// for actual API calls later and none of the components need to change.

export function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (err) {
    console.error(`Failed to load "${key}" from storage`, err);
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save "${key}" to storage`, err);
  }
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
