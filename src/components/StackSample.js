import React, { useContext } from "react";

import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";

import { Store } from "../Store";

import css from "../styles/styles.less";

const StackSample = (props) => {
  const { stack } = props;
  const { state } = useContext(Store);

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
        className={`${css.sampleItem} ${
          colorGrade === "invalid" ? css.invalid : null
        }`}
        key={`LT_${color}_${name}`}
      >
        <div className={css.samplePointer}>
          <div
            className={css.sampleChip}
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </li>
    );
  };

  const makePointerChip = (obj) => {
    const { tokens } = state;
    const { system } = tokens;
    const color = obj.default || "--";
    //const linkedColor = system.map((stack)=>{

    //});
    const name = obj.token;
    let lum = 0.0;
    let colorGrade = "";

    return (
      <li
        className={`${css.sampleItem} ${
          colorGrade === "invalid" ? css.invalid : null
        }`}
        key={`LT_${color}_${name}`}
      >
        <div className={css.samplePointer}>
          <div
            className={css.sampleChip}
            style={{ backgroundColor: color }}
          ></div>
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

  return <ul className={css.sampleStack}>{colorStack}</ul>;
};

export default StackSample;
