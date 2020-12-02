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

  const findNested = (obj, query) => {
    for (var key in obj) {
      var value = obj[key];
      if (typeof value === "object") {
        return findNested(value, query);
      }
      if (typeof value === "string") {
        //console.log(obj, query);
        return obj;
      }
    }
  };

  const getObject = (query) => {
    const { tokens } = state;
    const { system } = tokens;

    const colorStackNames = Object.keys(system);
    let isFound = false;

    console.log("1--------");
    console.log(query);
    for (let i = 0; i < colorStackNames.length; i++) {
      const stackname = colorStackNames[i];
      const objSort = system[stackname].find((o) => o.token === query);
      console.log(objSort);
      if (objSort) return objSort;
    }
  };

  const makePointerChip = (obj) => {
    const color = obj.default || obj.token || "--";
    const linkedColor = color;
    const name = obj.token;
    let lum = 0.0;
    let colorGrade = "";

    const tokenObject = getObject(color);

    console.log(tokenObject);

    return (
      <li
        className={`${css.stackItem} ${
          colorGrade === "invalid" ? css.invalid : null
        }`}
        key={`LT_${color}_${name}`}
      >
        <div className={css.chipPointer}>
          <div className={css.colortoken}>{name}</div>
          <div
            className={css.chip}
            style={{ backgroundColor: tokenObject.value }}
          ></div>
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
