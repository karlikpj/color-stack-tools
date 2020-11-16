import React, { useContext, useMemo } from "react";
import ColorChips from "./ColorChips";

import hexToRgb from "../utils/hexToRgb";

import { Store } from "../Store";
import { setLiveStacks, deleteLiveStack } from "../Actions";

import css from "../styles/styles.less";

const ColorStack = (props) => {
  const { color } = props;
  const { state, dispatch } = useContext(Store);
  const { stackSize } = state;

  const handleDelete = () => {
    deleteLiveStack(color, dispatch);
  };

  const handleColor = (e) => {
    setLiveStacks({ newcolor: e.target.value, color }, dispatch);
  };
  const memoizedColorChips = useMemo(
    () => <ColorChips tc={hexToRgb(color)} stackSize={~~(stackSize / 2)} />,
    [color, stackSize]
  );
  return (
    <div className={css.stackWrapper}>
      <a href="#" className={css.delete} onClick={(e) => handleDelete(e)}>
        X
      </a>
      {memoizedColorChips}
      <input type="color" value={color} onChange={(e) => handleColor(e)} />
    </div>
  );
};

export default ColorStack;
