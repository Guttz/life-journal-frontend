export const loadState = (): object => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

export const saveState = (state: object): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignoring write errors
  }
};

export const getToken = (): string => {
  if (!localStorage.getItem('user')) return '';

  // Later when creating editable user, replace any
  let user: any = localStorage.getItem('user');
  user = JSON.parse(user);
  if (user) return user['token'];
  else return '';
};

export const setToken = (value: string): void => {
  localStorage.setItem('token', value);
};

export const setProperty = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const getProperty = (key: string): string => {
  const itemAux = localStorage.getItem(key);
  const item = itemAux !== null ? itemAux : '';

  return item;
};
