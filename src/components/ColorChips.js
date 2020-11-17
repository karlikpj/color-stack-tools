import React from "react";

import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";
import toHex from "../utils/toHex";

import css from "../styles/styles.less";

const ColorChips = (props) => {
  const { tc, stackSize } = props;

  const colorStackA = [];
  const colorStackB = [];
  const dc = [
    (255 - tc[0]) / stackSize,
    (255 - tc[1]) / stackSize,
    (255 - tc[2]) / stackSize,
  ];
  const ac = [tc[0] / stackSize, tc[1] / stackSize, tc[2] / stackSize];

  const stackChip = (color, index) => {
    const lum = luminance(...hexToRgb(color));
    return (
      <li className={css.stackItem} key={`LT_${color}_${index}`}>
        <div className={css.chipHex}>
          <div className={css.chip} style={{ backgroundColor: color }}>
            <div className={css.lumtag}> {grade(lum)}</div>
          </div>
          {color}
        </div>
      </li>
    );
  };

  for (let i = 0; i < stackSize; i++) {
    const bgColor =
      "#" +
      toHex(255 - i * dc[0]) +
      toHex(255 - i * dc[1]) +
      toHex(255 - i * dc[2]);

    const fbColor =
      "#" +
      toHex((stackSize - i) * ac[0]) +
      toHex((stackSize - i) * ac[1]) +
      toHex((stackSize - i) * ac[2]);

    colorStackA.push(stackChip(bgColor, i));
    colorStackB.push(stackChip(fbColor, i));
  }

  const colorStack = colorStackA.concat(colorStackB);

  return <ul className={css.colorStack}>{colorStack}</ul>;
};

export default ColorChips;
