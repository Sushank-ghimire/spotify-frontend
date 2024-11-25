
const useLocalStorage = () => {
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key: string) => {
    const item = JSON.parse(localStorage.getItem(key)!);
    return item;
  };

  return [setItem, getItem] as const;
};

export default useLocalStorage;
