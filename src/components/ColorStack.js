import React, { useEffect, useContext } from "react";
import ColorChips from "./ColorChips";

import { Store } from "../Store";
import { setLiveStacks, deleteLiveStack } from "../Actions";

import css from "../styles/styles.less";

const ColorStack = (props) => {
  const { color } = props;
  const { state, dispatch } = useContext(Store);
  const { stackSize } = state;

  const [targetColor, setTargetColor] = React.useState(color);

  useEffect(() => {
    setTargetColor(color);
  }, [color]);

  const handleDelete = () => {
    deleteLiveStack(targetColor, dispatch);
  };

  const handleColor = (e) => {
    setLiveStacks({ newcolor: e.target.value, color: targetColor }, dispatch);
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
      <ColorChips tc={hexToRgb(targetColor)} stackSize={~~(stackSize / 2)} />
      <input
        type="color"
        value={targetColor}
        onChange={(e) => handleColor(e)}
      />
    </div>
  );
};

export default ColorStack;
