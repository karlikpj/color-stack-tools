const hexToRgb = (hex) => {
  /* eslint-disable */
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
  /* eslint-enable */
};

export default hexToRgb;
