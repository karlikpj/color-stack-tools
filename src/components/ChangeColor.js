import React, { useContext, useState } from "react";

import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";

import { Store } from "../Store";
import { setStackChip, setModalState } from "../Actions";

import css from "../styles/styles.less";

const ChangeColor = (props) => {
  const { color, id, name } = props;
  const { dispatch } = useContext(Store);
  const fcolor = !color ? "#FFFFFF" : color;
  const [targetColor, setTargetColor] = useState(fcolor);

  const setColor = (e) => {
    e.preventDefault();
    const config = {
      newcolor: targetColor,
      color,
      id,
      name,
    };
    setStackChip(config, dispatch);
    setModalState({ isOpen: false, content: null }, dispatch);
  };

  const handleColor = (e) => {
    setTargetColor(e.target.value);
  };

  const lum = luminance(...hexToRgb(targetColor));
  const colorGrade = grade(lum);

  return (
    <div style={{ width: 300 }}>
      <h2>Update Color Chip</h2>
      <div className={css.row}>
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

export default ChangeColor;
