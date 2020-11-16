import React, { createContext, useReducer } from "react";
import randomColor from "./utils/randomColor";

import uswdsTokens from "./tokens/uswds-tokens";
const baseColors = [
  // "#213867",
  "#007BBD",
  "#4BBFC6",
  // "#2A7F84",
  "#F7F7F7",
  // "#74767B",
  //  "4F5256",
  "#FFD62E",
  //"#D5A129",
  // "#926E1C",
  "#BB0E3D",
];

const initialState = {
  liveStacks: baseColors,
  stackSize: 10,
  tokens: uswdsTokens,
};

export const Store = createContext(initialState);

const setStackSize = (state, val) => {
  return { ...state, stackSize: val };
};

const addLiveStacks = (state) => {
  const { liveStacks } = state;
  const newStack = JSON.parse(JSON.stringify(liveStacks));
  newStack.push(randomColor());
  return { ...state, liveStacks: newStack };
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
      return deleteLiveStack(state, action.val);
    case "ADD_LIVESTACK":
      return addLiveStacks(state);
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
