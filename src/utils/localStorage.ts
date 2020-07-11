export const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignoring write errors
  }
};

export const getToken = (): any => {
  return localStorage.getItem('token');
};

export const setToken = (value: string): void => {
  localStorage.setItem('token', value);
};
