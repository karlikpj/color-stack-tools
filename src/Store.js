import React, { createContext, useReducer } from "react";
import initialState from './content';

export const Store = createContext(initialState);

const updateTop = (state, top) => {
  return { ...state, currentTop: top };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TOP":
      return updateTop(state, action.top);
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
