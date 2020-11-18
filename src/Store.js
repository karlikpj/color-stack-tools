import React, { createContext, useReducer } from "react";
import generateSpread from "./utils/generateSpread";

import uswdsTokens from "./tokens/uswds-tokens";
const baseColors = [
  "#ffffff",
  "#f4f4f4",
  "#eaeaea",
  "#e0e0e0",
  "#d6d6d6",
  "#cccccc",
  "#a3a3a3",
  "#7a7a7a",
  "#515151",
  "#282828",
];

const defaultStack = {
  id: 0,
  target: "#cccccc",
  stack: baseColors,
};

const initialState = {
  liveStacks: [],
  stackSize: 11,
  tokens: uswdsTokens,
  isModalOpen: false,
  modalContent: null,
};

const stackData = (id, color, stack) => {
  return {
    id: id,
    target: color,
    stack,
  };
};

export const Store = createContext(initialState);

const setStackSize = (state, val) => {
  return { ...state, stackSize: val };
};

const addLiveStack = (state, color) => {
  const { liveStacks, stackSize } = state;
  const newStack = JSON.parse(JSON.stringify(liveStacks));
  const stack = generateSpread(color, ~~(stackSize / 2));
  newStack.push(stackData(newStack.length + 1, color, stack));
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

const setStackChip = (state, config) => {
  const { newcolor, color, target } = config;
  const { liveStacks } = state;
  let newStack = JSON.parse(JSON.stringify(liveStacks));
  const i = newStack.findIndex((stack) => stack.target === target);
  const d = newStack[i].stack.findIndex((colors) => colors === color);
  newStack[i].stack[d] = newcolor;
  return { ...state, liveStacks: newStack };
};

const deleteLiveStack = (state, val) => {
  const { liveStacks } = state;
  if (liveStacks.length < 1) return { ...state };
  let newStack = JSON.parse(JSON.stringify(liveStacks));
  const i = newStack.findIndex((stack) => stack.target === val);
  newStack.splice(i, 1);
  return { ...state, liveStacks: newStack };
};
const setModalState = (state, config) => {
  const modalConfig = {
    isModalOpen: config.isOpen,
    modalContent: config.content || null,
  };
  return { ...state, ...modalConfig };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MODAL_STATE":
      return setModalState(state, action.config);
    case "SET_STACKSZIE":
      return setStackSize(state, action.val);
    case "SET_LIVESTACKS":
      return setLiveStacks(state, action.config);
    case "SET_STACKCHIP":
      return setStackChip(state, action.config);
    case "DELETE_LIVESTACK":
      return deleteLiveStack(state, action.val);
    case "ADD_LIVESTACK":
      return addLiveStack(state, action.color);
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
