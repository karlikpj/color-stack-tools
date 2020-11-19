export const addLiveStack = (value, dispatch) => {
  dispatch({
    type: "ADD_LIVESTACK",
    config: value,
  });
};

export const deleteLiveStack = (value, dispatch) => {
  dispatch({
    type: "DELETE_LIVESTACK",
    val: value,
  });
};

export const exportStack = (value, dispatch) => {
  dispatch({
    type: "EXPORT_STACK",
    val: value,
  });
};

export const loadLiveStack = (value, dispatch) => {
  dispatch({
    type: "LOAD_LIVESTACK",
    val: value,
  });
};

export const setLiveStacks = (value, dispatch) => {
  dispatch({
    type: "SET_LIVESTACKS",
    config: value,
  });
};

export const setModalState = (value, dispatch) => {
  dispatch({
    type: "SET_MODAL_STATE",
    config: value,
  });
};

export const setStackChip = (value, dispatch) => {
  dispatch({
    type: "SET_STACKCHIP",
    config: value,
  });
};
