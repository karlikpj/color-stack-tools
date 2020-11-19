import React, { createContext, useReducer } from "react";
import generateSpread from "./utils/generateSpread";
import grade from "./utils/grade";
import hexToRgb from "./utils/hexToRgb";
import luminance from "./utils/luminance";

import uswdsTokens from "./tokens/uswds-tokens";

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

const getItemsList = (tokens) => {
  return Object.keys(tokens);
};

const defaultStack = { red: [], green: [] };
defaultStack.red = uswdsTokens.system.red;
defaultStack.green = uswdsTokens.system.green;
//defaultStack.blue = uswdsTokens.system.blue;

const initialState = {
  liveStacks: defaultStack,
  stackSize: 10,
  tokens: uswdsTokens,
  tokenSections: propertiesToArray(uswdsTokens), //Object.keys(uswdsTokens),
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

export const clone = (array) => {
  return JSON.parse(JSON.stringify(array));
};

const setStackSize = (state, val) => {
  return { ...state, stackSize: val };
}; //

const exportStack = (state, config) => {
  const { stack, id = "undefinted" } = config;
  let dataSet = {};
  dataSet[id] = [];
  for (let i = 0; i < stack.length; i++) {
    const lum = luminance(...hexToRgb(stack[i]));
    const colorGrade = grade(lum);
    dataSet[id].push({
      token: `${id}-${colorGrade}`,
      value: stack[i],
    });
  }

  window.open().document.write(JSON.stringify(dataSet));
  return { ...state };
};

const addLiveStack = (state, config) => {
  const { colorName, targetColor } = config;
  const { liveStacks, stackSize } = state;
  const newStack = clone(liveStacks);
  const stack = generateSpread(targetColor, ~~(stackSize / 2));
  newStack.push(stackData(colorName, targetColor, stack));
  return { ...state, liveStacks: newStack };
};

const loadLiveStack = (state, val) => {
  const { tokens, liveStacks } = state;
  let newStack = clone(liveStacks);
  const sec = val.split(".");
  console.log(tokens[sec[0]]);
  let newSet = {};
  newSet[sec[1]] = tokens[sec[0]][sec[1]];
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

const setStackChip = (state, config) => {
  const { newcolor, color, id, name } = config;
  const { liveStacks } = state;
  let newStack = clone(liveStacks);
  const d = newStack[id].findIndex((colors) => colors.value === color);
  newStack[id][d] = { token: name, value: newcolor };
  return { ...state, liveStacks: newStack };
};

const deleteLiveStack = (state, val) => {
  const { liveStacks } = state;
  let newStack = clone(liveStacks);
  delete newStack[val];
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
    case "EXPORT_STACK":
      return exportStack(state, action.config);
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
    case "LOAD_LIVESTACK":
      return loadLiveStack(state, action.val);
    case "ADD_LIVESTACK":
      return addLiveStack(state, action.config);
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
