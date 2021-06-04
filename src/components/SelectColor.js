import React, { useContext, useState } from "react";

import StackSample from "./StackSample";
import LuminanceDisplay from "./LuminanceDisplay";

import generateSpread from "../utils/generateSpread";
import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";

import { Store } from "../Store";
import { addLiveStack, setModalState } from "../Actions";

import css from "../styles/styles.less";

const SelectColor = (props) => {
  const { color = "#cccccc", vcolor = "#eeeeee" } = props;
  const { state, dispatch } = useContext(Store);
  const [stackType, setStackType] = useState("default");
  const [targetColor, setTargetColor] = useState(color);
  const [vividColor, setVividColor] = useState(vcolor);
  const [colorName, setColorName] = useState("undefined");
  const { stackSize } = state;
  const isDisabled = colorName === "undefined";

  const setColor = (e) => {
    if (isDisabled) return;
    e.preventDefault();
    let parentColor = makeObject(targetColor);
    if (stackType === "default") {
      let variantColor = makeObject(vividColor);
      variantColor.splice(-1, 1);
      parentColor[10] = { name: "vivid", value: variantColor };
    }
    const config = {
      global: {
        category: `system-color-${colorName}`,
      },
      props: [
        {
          name: colorName,
          value: parentColor,
        },
      ],
      options: {
        file: "system-color",
      },
    };
    addLiveStack(config, dispatch);
    setModalState({ isOpen: false, content: null }, dispatch);
  };

  const handleColor = (e, type) => {
    const color = e.target.value;
    const lum = luminance(...hexToRgb(color)).toFixed(2);
    // prevent all black or white as a base color
    if (lum > 0.9 || lum < 0.02) {
      return;
    } else {
      if (type === 1) {
        setTargetColor(e.target.value);
      } else {
        setVividColor(e.target.value);
      }
    }
  };

  const handleUpdate = (e) => {
    setColorName(e.target.value);
  };

  const makeObject = (targetColor) => {
    const colorArray = generateSpread(targetColor, ~~(stackSize / 2));
    return colorArray.map((color) => {
      const colorGrade = grade(luminance(...hexToRgb(color)));
      return { name: colorGrade.toString(), value: color };
    });
  };

  const lum = luminance(...hexToRgb(targetColor));
  const vlum = luminance(...hexToRgb(vividColor));

  return (
    <div style={{ width: 350 }}>
      <h2>Pick a color as the base for this palette.</h2>
      <p className={css.info}>
        You will be able to tun the individual color chips once you save the
        base color.
      </p>
      <div className={css.row}>
        <div className={css.column}>
          <div className={css.form}>
            <label>Color Name </label>
            <input
              className={css.colorName}
              value={colorName}
              onChange={(e) => handleUpdate(e)}
            />
          </div>

          <ul className={css.selectorUI}>
            <li>
              <StackSample stack={makeObject(targetColor)} />
              <input
                type="color"
                value={targetColor}
                onChange={(e) => handleColor(e, 1)}
              />
            </li>
            <li
              className={css.targetColor}
              style={{
                background: targetColor,
                color: lum < 0.2 ? "#FFF" : "#000",
              }}
            >
              {targetColor}
            </li>
            <li>
              <LuminanceDisplay targetColor={targetColor} />
            </li>
          </ul>
        </div>
      </div>

      <div className={css.row}>
        <div className={css.column}>
          <div className={css.form}>
            <label>Vivid Variation </label>
            {stackType === "default" ? (
              <ul className={css.selectorUI}>
                <li>
                  <StackSample stack={makeObject(vividColor)} />
                  <input
                    type="color"
                    value={vividColor}
                    onChange={(e) => handleColor(e, 2)}
                  />
                </li>
                <li
                  className={css.targetColor}
                  style={{
                    background: vividColor,
                    color: vlum < 0.2 ? "#FFF" : "#000",
                  }}
                >
                  {vividColor}
                </li>
                <li>
                  <LuminanceDisplay targetColor={vividColor} />
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      <div className={css.row}>
        <div className={css.column}>
          <a
            href="#"
            className={`${css.button} ${css.modal} ${
              isDisabled ? css.disabled : null
            }`}
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
