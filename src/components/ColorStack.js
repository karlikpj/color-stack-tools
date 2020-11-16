import React, { useEffect, useContext } from "react";
import ColorChips from "./ColorChips";

import { Store } from "../Store";
import { setLiveStacks, deleteLiveStack } from "../Actions";

import css from "../styles/styles.less";

const ColorStack = (props) => {
  const { color } = props;
  const { state, dispatch } = useContext(Store);
  const { stackSize } = state;
  console.log(color);
  const handleDelete = () => {
    deleteLiveStack(color, dispatch);
  };

  const handleColor = (e) => {
    setLiveStacks({ newcolor: e.target.value, color }, dispatch);
  };
  /* eslint-disable */
  const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  };
  /* eslint-enable */
  return (
    <div className={css.stackWrapper}>
      <a href="#" className={css.delete} onClick={(e) => handleDelete(e)}>
        X
      </a>
      <ColorChips tc={hexToRgb(color)} stackSize={~~(stackSize / 2)} />
      <input type="color" value={color} onChange={(e) => handleColor(e)} />
    </div>
  );
};

export default ColorStack;
