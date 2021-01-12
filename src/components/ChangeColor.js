import React, { useContext, useState } from "react";

import LuminanceDisplay from "./LuminanceDisplay";

import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";

import { Store } from "../Store";
import { setStackChip, setModalState } from "../Actions";

import css from "../styles/styles.less";

const ChangeColor = (props) => {
  const { color, stackObject, id } = props;
  const { dispatch } = useContext(Store);
  const fcolor = !color ? "#FFFFFF" : color.value;
  const [targetColor, setTargetColor] = useState(fcolor);

  const setColor = (e) => {
    e.preventDefault();
    const lum = luminance(...hexToRgb(targetColor));
    const colorGrade = grade(lum);
    const config = {
      newcolor: targetColor,
      color,
      id,
      colorGrade,
    };
    setStackChip(config, dispatch);
    setModalState({ isOpen: false, content: null }, dispatch);
  };

  const handleColor = (e) => {
    setTargetColor(e.target.value);
  };

  const lum = luminance(...hexToRgb(targetColor));
  console.log(targetColor);
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
