import React, { useContext } from "react";

import ChangeColor from "./ChangeColor";

import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";

import { Store } from "../Store";
import { setModalState } from "../Actions";

import css from "../styles/styles.less";

const ColorChips = (props) => {
  const { stack, target, isActive = false } = props;
  const { dispatch } = useContext(Store);

  const changeColor = (color) => {
    if (!isActive) return;
    setModalState(
      { isOpen: true, content: <ChangeColor color={color} target={target} /> },
      dispatch
    );
  };

  const stackChip = (color, index) => {
    const lum = luminance(...hexToRgb(color));
    const colorGrade = grade(lum);
    return (
      <li
        className={`${css.stackItem} ${
          colorGrade === "invalid" ? css.invalid : null
        }`}
        key={`LT_${color}_${index}`}
      >
        <div className={css.chipHex}>
          <div
            className={css.chip}
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}
          ></div>
          <div className={css.colortag}>{color}</div>
          <div className={css.lumtag}> {colorGrade}</div>
        </div>
      </li>
    );
  };

  const colorStack = stack.map((color, index) => {
    return stackChip(color, index);
  });

  return <ul className={css.colorStack}>{colorStack}</ul>;
};

export default ColorChips;
