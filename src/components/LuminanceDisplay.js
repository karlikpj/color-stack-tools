import React from "react";

import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";

import css from "../styles/styles.less";

const LuminanceDisplay = (props) => {
  const { targetColor } = props;
  const lum = luminance(...hexToRgb(targetColor)).toFixed(4);
  let colorGrade = grade(lum);
  colorGrade = colorGrade === "invalid" ? "--" : colorGrade;
  return (
    <ul className={css.modalItems}>
      <li>luminance</li>
      <li
        className={css.data}
        style={{
          background: targetColor,
          color: lum < 0.2 ? "#FFF" : "#000",
        }}
      >
        {lum}
      </li>
      <li>grade</li>
      <li
        className={css.data}
        style={{ background: colorGrade !== "--" ? "#FFF" : "#ffd5d5" }}
      >
        {colorGrade}
      </li>
    </ul>
  );
};

export default LuminanceDisplay;
