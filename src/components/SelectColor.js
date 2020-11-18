import React, { useContext, useState } from "react";

import ColorChips from "./ColorChips";

import generateSpread from "../utils/generateSpread";
import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";

import { Store } from "../Store";
import { addLiveStack, setModalState } from "../Actions";

import css from "../styles/styles.less";

const SelectColor = (props) => {
  const { color = "#cccccc" } = props;
  const { state, dispatch } = useContext(Store);
  const [targetColor, setTargetColor] = useState(color);
  const { stackSize } = state;

  const setColor = (e) => {
    e.preventDefault();
    addLiveStack(targetColor, dispatch);
    setModalState({ isOpen: false, content: null }, dispatch);
  };

  const handleColor = (e) => {
    setTargetColor(e.target.value);
  };

  const lum = luminance(...hexToRgb(targetColor));
  const colorGrade = grade(lum);
  const stack = generateSpread(targetColor, ~~(stackSize / 2));
  return (
    <div style={{ width: 550 }}>
      <h2>Select Base Color for Stack</h2>
      <div className={css.row}>
        <div className={css.column}>
          <ColorChips stack={stack} />
        </div>

        <div className={css.column}>
          <ul className={css.selectorUI}>
            <li className={css.targetColor}>{targetColor}</li>
            <li>
              <ul className={css.modalItems}>
                <li>luminance</li>
                <li className={css.data}>{lum.toFixed(4)}</li>
                <li>grade</li>
                <li className={css.data}>{colorGrade}</li>
              </ul>
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
        <div className={css.column}>
          <a
            href="#"
            className={`${css.button} ${css.modal}`}
            onClick={(e) => setColor(e)}
          >
            Save Color
          </a>
        </div>
      </div>
    </div>
  );
};

export default SelectColor;
