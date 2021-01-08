import React, { createContext, useReducer } from "react";

import uswdsTokens from "./tokens/uswds-tokens";
import cranberry from "./tokens/cranberry";
import blue_cool from "./tokens/blue-cool";
import mint from "./tokens/mint";
import gray_warm from "./tokens/gray-warm";
import orange_warm from "./tokens/orange-warm";

const propertiesToArray = (obj) => {
  const isObject = (val) => typeof val === "object" && !Array.isArray(val);
  const addDelimiter = (a, b) => (a ? `${a}.${b}` : b);
  const paths = (obj = {}, head = "") => {
    return Object.entries(obj).reduce((product, [key, value]) => {
      let fullPath = addDelimiter(head, key);
      return isObject(value)
        ? product.concat(paths(value, fullPath))
        : product.concat(fullPath);
    }, []);
  };
  return paths(obj);
};

const defaultStack = { gray_warm, blue_cool, orange_warm, mint };
//defaultStack.blue = uswdsTokens.system.blue;

const initialState = {
  isModalOpen: false,
  liveStacks: defaultStack,
  modalContent: null,
  stackSize: 10,
  tokens: uswdsTokens,
  tokenSections: propertiesToArray(uswdsTokens),
  cranberry,
};

export const Store = createContext(initialState);

export const jsonstring = (array) => {
  return JSON.stringify(array);
};

export const clone = (array) => {
  return JSON.parse(jsonstring(array));
};

const addLiveStack = (state, config) => {
  const { colorName, stack } = config;
  const { liveStacks } = state;
  let newStack = clone(liveStacks);
  newStack[`${colorName}`] = stack;

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
  //window.open().document.write(jsonstring(newStack));
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
  const { newcolor, color, id, name } = config;
  const { liveStacks } = state;
  let newStack = clone(liveStacks);
  const d = newStack[id].findIndex((colors) => colors.value === color);
  newStack[id][d].token = name;
  newStack[id][d].value = newcolor;
  return { ...state, liveStacks: newStack };
};

const reducer = (state, action) => {
  switch (action.type) {
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
