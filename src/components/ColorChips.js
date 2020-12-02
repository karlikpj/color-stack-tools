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
  const { state, dispatch } = useContext(Store);

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

  const makeColorChip = (obj) => {
    const color = obj.value || "--";
    const name = obj.token;
    let lum = 0.0;
    let colorGrade = "";
    if (color !== "--") {
      lum = luminance(...hexToRgb(color));
      colorGrade = grade(lum);
    }
    return (
      <li
        className={`${css.stackItem} ${
          colorGrade === "invalid" ? css.invalid : null
        }`}
        key={`LT_${color}_${name}`}
      >
        <div
          className={css.chipHex}
          onClick={() => {
            if (color === "--") return;
            changeColor(color, name);
          }}
        >
          <div className={css.chip} style={{ backgroundColor: color }}></div>
          <div className={css.colortag}>{color}</div>
          <div className={css.lumtag}>
            {colorGrade !== "invalid" ? colorGrade : "--"}
          </div>
        </div>
      </li>
    );
  };

  const getObject = (obj, query) => {
    console.log(obj);
    for (var key in obj) {
      var value = obj[key];
      if (typeof value === "object") {
        return getObject(value, query);
      }
      if (
        typeof value === "string" &&
        value.toLowerCase().indexOf(query.toLowerCase()) > -1
      ) {
        return obj;
      }
    }
  };

  const makePointerChip = (obj) => {
    const { tokens } = state;
    const { system } = tokens;
    //console.log(tokens);
    const color = obj.default || "--";

    const tokenObject = getObject(tokens.system, color);

    const linkedColor = color;
    console.log(color, tokenObject?.value);

    const name = obj.token;
    let lum = 0.0;
    let colorGrade = "";

    return (
      <li
        className={`${css.stackItem} ${
          colorGrade === "invalid" ? css.invalid : null
        }`}
        key={`LT_${color}_${name}`}
      >
        <div className={css.chipPointer}>
          <div className={css.colortoken}>{name}</div>
          <div className={css.chip} style={{ backgroundColor: color }}></div>
          <div className={css.colortag}>{linkedColor}</div>
          <div className={css.lumtag}>
            {colorGrade !== "invalid" ? colorGrade : "--"}
          </div>
        </div>
      </li>
    );
  };

  const stackChip = (obj) => {
    let color = obj.value || "--";
    let hasDefault = obj?.default;
    const notColor = color.indexOf("#");

    if (!notColor && !hasDefault) {
      return makeColorChip(obj);
    }
    if (notColor && hasDefault) return makePointerChip(obj);
  };

  const colorStack = stack.map((color, index) => {
    return stackChip(color, index);
  });

  return (
    <ul className={css.colorStack}>
      <li className={css.stackItem}>
        <div className={css.chipLabel}>hex# value&nbsp;&nbsp;&nbsp;</div>
        <div className={css.chipLabel}>grade</div>
      </li>
      {colorStack}
    </ul>
  );
};

export default ColorChips;
