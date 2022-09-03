export const localStorageEffect =
  (key : any) =>
  ({ setSelf, onSet } : any) => {
    const savedValue = localStorage.getItem(key);
    // console.log(savedValue);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue : any) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };