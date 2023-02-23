import { useState } from 'react';

type SetValue<T> = T | ((val: T) => T);

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: SetValue<T>): void => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return [storedValue, setValue];
};
