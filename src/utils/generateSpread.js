import hexToRgb from "./hexToRgb";
import toHex from "./toHex";

const generateSpread = (targetColor, stackSize) => {
  const tc = hexToRgb(targetColor);
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

    colorStackA.push(bgColor);
    colorStackB.push(fbColor);
  }

  const colorStack = colorStackA.concat(colorStackB);

  return colorStack;
};

export default generateSpread;
