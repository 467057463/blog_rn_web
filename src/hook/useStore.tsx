import React from 'react';
import RootStore from '../store';

const storeContext = React.createContext<RootStore | null>(null);
export const StoreProvider = ({ children }) => {
  return (
    <storeContext.Provider value={new RootStore()}>
      {children}
    </storeContext.Provider>
  );
};

export const useStore = () => {
  const _store = React.useContext(storeContext);
  if (!_store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return _store;
};
