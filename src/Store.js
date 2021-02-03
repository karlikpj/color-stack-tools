import React, { createContext, useReducer } from "react";

import propertiesToArray from "./utils/propertiesToArray";
//import uswdsTokens from "./tokens/uswds-tokens";
import tokens from "./tokens/";

const defaultStack = { cranberry: {} };
defaultStack.cranberry = tokens.cranberry;

const tokenOptions = propertiesToArray(defaultStack);

const initialState = {
  isModalOpen: false,
  liveStacks: defaultStack,
  modalContent: null,
  stackSize: 10,
  tokens,
  tokenSections: propertiesToArray(tokens),
  demo: {
    foreground: "#eeeeee",
    background: "#333333",
    primary: "#0d7ea2",
    secondary: "#28a1a9",
  },
};

export const Store = createContext(initialState);

export const jsonstring = (array) => {
  return JSON.stringify(array);
};

export const clone = (array) => {
  return JSON.parse(jsonstring(array));
};

const setDemo = (state, config) => {
  const { demo } = state;
  let newDemo = clone(demo);
  newDemo[config.demoSelect] = config.targetColor;
  return { ...state, demo: newDemo };
};

const addLiveStack = (state, config) => {
  const colorName = config.props.name;
  const { liveStacks } = state;
  let newStack = clone(liveStacks);
  newStack[`${colorName}`] = config;

  return { ...state, liveStacks: newStack };
};

const deleteLiveStack = (state, val) => {
  const { liveStacks } = state;
  let newStack = clone(liveStacks);
  delete newStack[val];
  return { ...state, liveStacks: newStack };
};

const exportStack = (state, val) => {
  const { liveStacks } = state;
  let newStack = {};
  newStack[`${val}`] = clone(liveStacks[val]);
  const stackColors = jsonstring(newStack);
  window.open().document.write(jsonstring(newStack));
  return { ...state };
};

const formatStack = (state, val) => {
  const { liveStacks } = state;
  let newStack = {};
  newStack[`${val}`] = clone(liveStacks[val]);
  window.open().document.write(jsonstring(newStack));
  return { ...state };
};

const loadLiveStack = (state, val) => {
  const { tokens, liveStacks } = state;
  let newStack = clone(liveStacks);
  let newSet = {};

  if (val.indexOf(".") !== -1) {
    const sec = val.split(".");
    newSet[`${sec[1]}`] = tokens[sec[0]][sec[1]];
  } else {
    newSet[`${val}`] = tokens[val];
  }

  newStack = {
    ...newStack,
    ...newSet,
  };
  return { ...state, liveStacks: newStack };
};

const setLiveStacks = (state, config) => {
  const { newcolor, color } = config;
  const { liveStacks } = state;
  let newStack = clone(liveStacks);
  const i = newStack.findIndex((colors) => colors === color);
  newStack[i] = newcolor;
  return { ...state, liveStacks: newStack };
};

const setModalState = (state, config) => {
  const modalConfig = {
    isModalOpen: config.isOpen,
    modalContent: config.content || null,
  };
  return { ...state, ...modalConfig };
};

const setStackChip = (state, config) => {
  const { newcolor, color, colorGrade, category } = config;
  const { liveStacks } = state;
  let newStack = clone(liveStacks);
  const colorName = category;

  let d = newStack[colorName].props[0].value.findIndex((colors) => {
    return colors.value === color;
  });
  // some items are double nested for vivid variations
  if (d < 0) {
    d = newStack[colorName].props[0].value[10].value.findIndex((colors) => {
      return colors.value === color;
    });
    newStack[colorName].props[0].value[10].value[d].name = colorGrade;
    newStack[colorName].props[0].value[10].value[d].value = newcolor;
  } else {
    newStack[colorName].props[0].value[d].name = colorGrade;
    newStack[colorName].props[0].value[d].value = newcolor;
  }

  return { ...state, liveStacks: newStack };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DEMO":
      return setDemo(state, action.config);
    case "ADD_LIVESTACK":
      return addLiveStack(state, action.config);
    case "DELETE_LIVESTACK":
      return deleteLiveStack(state, action.val);
    case "EXPORT_STACK":
      return exportStack(state, action.val);
    case "FORMAT_STACK":
      return formatStack(state, action.val);
    case "LOAD_LIVESTACK":
      return loadLiveStack(state, action.val);
    case "SET_MODAL_STATE":
      return setModalState(state, action.config);
    case "SET_LIVESTACKS":
      return setLiveStacks(state, action.config);
    case "SET_STACKCHIP":
      return setStackChip(state, action.config);
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
