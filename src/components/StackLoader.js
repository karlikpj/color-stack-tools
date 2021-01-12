import React, { useContext } from "react";

import ChangeColor from "./ChangeColor";

import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";

import { Store } from "../Store";
import { setModalState } from "../Actions";

import css from "../styles/styles.less";

const StackLoader = (props) => {
  const { stackObject, id, isActive = false } = props;
  const { state, dispatch } = useContext(Store);

  const changeColor = (color) => {
    if (!isActive) return;
    let stackId = stackObject?.global.category;
    let name = stackObject?.props[0].name;
    setModalState(
      {
        isOpen: true,
        content: (
          <ChangeColor color={color} id={name} stackObject={stackObject} />
        ),
      },
      dispatch
    );
  };

  const makeColorChip = (obj) => {
    const colorItem = obj.map((color, index) => {
      if (Array.isArray(color.value)) {
        return (
          <li key={`sub_${color.name}`}>
            <ul>
              <li className={css.chipLabel}>
                <br />
                variation {color.name}
              </li>
              {makeColorChip(color.value)}
            </ul>
          </li>
        );
      }
      if (!color.value) return;
      return (
        <li key={`${color.value}_${color.name}`} className={css.stackItem}>
          <div
            className={css.chipHex}
            onClick={() => {
              changeColor(color);
            }}
          >
            <div
              className={css.chip}
              style={{ backgroundColor: color.value }}
            ></div>

            <div
              className={css.colortag}
              dangerouslySetInnerHTML={{ __html: color.value }}
            ></div>
            <div className={css.lumtag}>{color.name}</div>
          </div>
        </li>
      );
    });

    return (
      <ul className={css.colorStack}>
        <li className={css.stackItem}>
          <div className={css.chipLabel}>hex# value&nbsp;&nbsp;&nbsp;</div>
          <div className={css.chipLabel}>grade</div>
        </li>
        {colorItem}
      </ul>
    );
  };

  const getObject = (query) => {
    const { tokens } = state;
    const { system } = tokens;
    const colorStackNames = Object.keys(system);
    for (let i = 0; i < colorStackNames.length; i++) {
      const stackname = colorStackNames[i];
      const objSort = system[stackname].find((o) => o.token === query);
      if (objSort) return objSort;
    }
  };

  const colorStack = () => {
    //const { global, options } = stackObject;
    const colorName = stackObject["props"][0].name;
    const colors = stackObject["props"][0].value;
    const colorArray = makeColorChip(colors, colorName);

    return (
      <div>
        <h3>family: {colorName}</h3>
        <ul className={css.colorStack}>
          <li className={css.chipLabel}>{stackObject.global.category}</li>
          {colorArray}
        </ul>
      </div>
    );
  };

  return colorStack();
};

export default StackLoader;
