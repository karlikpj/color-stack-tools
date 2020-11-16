export const setStackSize = (value, dispatch) => {
  dispatch({
    type: "SET_STACKSZIE",
    val: value,
  });
};

export const setLiveStacks = (value, dispatch) => {
  dispatch({
    type: "SET_LIVESTACKS",
    config: value,
  });
};

export const deleteLiveStack = (value, dispatch) => {
  dispatch({
    type: "DELETE_LIVESTACK",
    val: value,
  });
};
