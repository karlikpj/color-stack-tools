import React, { useContext, useState } from "react";

import LuminanceDisplay from "./LuminanceDisplay";

import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";
import propertiesToArray from "../utils/propertiesToArray";

import { Store } from "../Store";
import { setStackChip, setModalState, setDemo } from "../Actions";

import css from "../styles/styles.less";

const ChangeColor = (props) => {
  const { color, stackObject, id } = props;
  const { dispatch, state } = useContext(Store);
  const { demo } = state;
  const fcolor = !color ? "#FFFFFF" : color.value;
  const [targetColor, setTargetColor] = useState(fcolor);
  const [isDisabled, setDisabled] = useState(true);
  const [demoSelect, setDemoSelect] = useState("foreground");

  const setColor = (e) => {
    e.preventDefault();
    const lum = luminance(...hexToRgb(targetColor));
    const colorGrade = grade(lum);
    const config = {
      newcolor: targetColor,
      color: color.value,
      colorGrade,
    };
    setStackChip(config, dispatch);
    setModalState({ isOpen: false, content: null }, dispatch);
  };

  const handleColor = (e) => {
    setTargetColor(e.target.value);
  };
  const changeDemoColor = (e) => {
    const config = {
      targetColor,
      demoSelect,
    };
    setDemo(config, dispatch);
  };
  const handleSelect = (e) => {
    setDemoSelect(e.target.value);
  };
  const demoOptions = propertiesToArray(demo);
  console.log(demo);
  const dropDown = (
    <select value={demoSelect} onChange={handleSelect}>
      {demoOptions.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );

  const lum = luminance(...hexToRgb(targetColor)).toFixed(2);
  const colorGrade = grade(lum);
  return (
    <div style={{ width: 300 }}>
      <h2>Update Color Chip</h2>
      <h5>{stackObject.global.category}</h5>
      <p className={css.info}>
        Tune this color chip by selecting a new hue, or fix a gradient within a
        color family.
      </p>
      <div className={css.row}>
        <div className={css.column}>
          <ul className={css.selectorUI}>
            <li
              className={css.targetColor}
              style={{
                background: targetColor,
                color: lum < 0.2 ? "#FFF" : "#000",
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: targetColor }} />
            </li>
            <li>
              <LuminanceDisplay targetColor={targetColor} />
            </li>
            <li>
              <input
                type="color"
                value={targetColor}
                onChange={(e) => handleColor(e)}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className={css.row}>
        <div className={css.column}>{dropDown}</div>
        <div className={css.column}>
          {" "}
          <a
            href="#"
            className={`${css.button} ${css.modal}`}
            onClick={(e) => changeDemoColor(e)}
          >
            Set Demo
          </a>
        </div>
        <div className={css.column}>
          {colorGrade !== "invalid" ? (
            <a
              href="#"
              className={`${css.button} ${css.modal}`}
              onClick={(e) => setColor(e)}
            >
              Save Color
            </a>
          ) : (
            <a
              href="#"
              className={`${css.disabled} ${css.button} ${css.modal}`}
              onClick={() => {}}
              disabled
            >
              Save Color
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeColor;
