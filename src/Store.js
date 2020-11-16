import React, { createContext, useReducer } from "react";

const baseColors = ["#213867", "#4BBFC6", "#FFD62E", "#BB0E3D"];

const initialState = {
  liveStacks: baseColors,
  stackSize: 10,
};

export const Store = createContext(initialState);

const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777214).toString(16);
};

const setStackSize = (state, val) => {
  console.log(val);
  return { ...state, stackSize: val };
};

const setLiveStacks = (state, config) => {
  const { newcolor, color } = config;
  const { liveStacks } = state;
  let newStack = JSON.parse(JSON.stringify(liveStacks));
  const i = newStack.findIndex((colors) => colors === color);
  newStack[i] = newcolor;
  return { ...state, liveStacks: newStack };
};

const deleteLiveStack = (state, val) => {
  const { liveStacks } = state;
  if (liveStacks.length < 2) return { ...state };
  let newStack = JSON.parse(JSON.stringify(liveStacks));
  const i = newStack.findIndex((colors) => colors === val);
  newStack.splice(i, 1);
  return { ...state, liveStacks: newStack };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STACKSZIE":
      return setStackSize(state, action.val);
    case "SET_LIVESTACKS":
      return setLiveStacks(state, action.config);
    case "DELETE_LIVESTACK":
      return deleteLiveStack(state, action.config);
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
