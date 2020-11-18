export const setStackSize = (value, dispatch) => {
  dispatch({
    type: "SET_STACKSZIE",
    val: value,
  });
};
export const addLiveStack = (value, dispatch) => {
  dispatch({
    type: "ADD_LIVESTACK",
    config: value,
  });
};

export const setLiveStacks = (value, dispatch) => {
  dispatch({
    type: "SET_LIVESTACKS",
    config: value,
  });
};

export const setStackChip = (value, dispatch) => {
  dispatch({
    type: "SET_STACKCHIP",
    config: value,
  });
};

export const exportStack = (value, dispatch) => {
  dispatch({
    type: "EXPORT_STACK",
    config: value,
  });
};

export const deleteLiveStack = (value, dispatch) => {
  dispatch({
    type: "DELETE_LIVESTACK",
    val: value,
  });
};

export const setModalState = (value, dispatch) => {
  dispatch({
    type: "SET_MODAL_STATE",
    config: value,
  });
};
