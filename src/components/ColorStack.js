import React, { useEffect } from "react";
import ColorChips from "./ColorChips";
import css from "../styles/styles.less";

const ColorStack = (props) => {
  const { color, stackSize } = props;
  const [targetColor, setTargetColor] = React.useState(color);

  useEffect(() => {
    setTargetColor(color);
  }, [color]);

  const handleDelete = () => {
    props.removeColor(targetColor);
  };

  const handleColor = (e) => {
    props.updateColor(e.target.value, targetColor);
  };
  /* eslint-disable */
  const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  };
  /* eslint-enable */
  return (
    <div className={css.stackWrapper}>
      <a href="#" className={css.delete} onClick={(e) => handleDelete(e)}>
        X
      </a>
      <ColorChips tc={hexToRgb(targetColor)} stackSize={stackSize} />
      <input
        type="color"
        value={targetColor}
        onChange={(e) => handleColor(e)}
      />
    </div>
  );
};

export default ColorStack;
