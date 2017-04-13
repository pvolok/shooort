const KEY = 'shooooort:history';

export function getAll() {
  try {
    const json = localStorage[KEY];
    if (json) {
      return JSON.parse(localStorage[KEY]);
    }
  } catch (e) {}
  return [];
}

export function save(links) {
  localStorage[KEY] = JSON.stringify(links);
}
