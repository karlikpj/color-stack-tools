import React, { useContext } from "react";

import ChangeColor from "./ChangeColor";

import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";

import { Store } from "../Store";
import { setModalState } from "../Actions";

import css from "../styles/styles.less";

const ColorChips = (props) => {
  const { stack, id, isActive = false } = props;
  const { dispatch } = useContext(Store);

  const changeColor = (color) => {
    if (!isActive) return;
    setModalState(
      {
        isOpen: true,
        content: <ChangeColor color={color} id={id} name={name} />,
      },
      dispatch
    );
  };

  const stackChip = (obj, index) => {
    let color = obj.value;
    const name = obj.token;
    let lum = 0.0;
    if (color !== "transparent") {
      lum = color ? luminance(...hexToRgb(color)) : 0.0;
    }
    let colorGrade = color ? grade(lum) : "invalid";
    return (
      <li
        className={`${css.stackItem} ${
          colorGrade === "invalid" ? css.invalid : null
        }`}
        key={`LT_${color}_${name}`}
      >
        <div className={css.chipHex}>
          <div
            className={css.chip}
            onClick={() => {
              changeColor(color, name);
            }}
            style={{ backgroundColor: color }}
          ></div>
          <div className={css.colortag}>{color}</div>
          <div className={css.lumtag}>
            {colorGrade !== "invalid" ? colorGrade : "--"}
          </div>
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
