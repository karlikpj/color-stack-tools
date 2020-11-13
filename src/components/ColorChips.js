import React from "react";
import css from "../styles/styles.less";

const ColorChips = (props) => {
  const { tc, stackSize } = props;

  const toHex = (n) => {
    var h = (~~n).toString(16);
    if (h.length < 2) h = "0" + h;
    return h;
  };

  const colorStackA = [];
  const colorStackB = [];
  const dc = [
    (255 - tc[0]) / stackSize,
    (255 - tc[1]) / stackSize,
    (255 - tc[2]) / stackSize,
  ];
  const ac = [tc[0] / stackSize, tc[1] / stackSize, tc[2] / stackSize];
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

    colorStackA.push(
      <li className={css.stackItem} key={`LT_${bgColor}_${i}`}>
        <div className={css.chipHex}>
          <div className={css.chip} style={{ backgroundColor: bgColor }} />
          {bgColor}
        </div>
      </li>
    );
    colorStackB.push(
      <li className={css.stackItem} key={`DK_${bgColor}_${i}`}>
        <div className={css.chipHex}>
          <div className={css.chip} style={{ backgroundColor: fbColor }} />
          {fbColor}
        </div>
      </li>
    );
  }

  const colorStack = colorStackA.concat(colorStackB);

  return <ul className={css.colorStack}>{colorStack}</ul>;
};

export default ColorChips;
