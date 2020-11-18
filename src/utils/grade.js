// https://designsystem.digital.gov/design-tokens/color/overview/
const grade = (lum) => {
  let gd = "invalid";
  if (lum >= 1) gd = 0;
  if (lum >= 0.85 && lum <= 0.93) gd = 5;
  if (lum >= 0.75 && lum <= 0.82) gd = 10;
  if (lum >= 0.5 && lum <= 0.65) gd = 20;
  if (lum >= 0.35 && lum <= 0.45) gd = 30;
  if (lum >= 0.25 && lum <= 0.3) gd = 40;
  if (lum >= 0.175 && lum <= 0.183) gd = 50;
  if (lum >= 0.1 && lum <= 0.125) gd = 60;
  if (lum >= 0.05 && lum <= 0.07) gd = 70;
  if (lum >= 0.02 && lum <= 0.04) gd = 80;
  if (lum >= 0.005 && lum <= 0.015) gd = 90;
  if (lum <= 0) gd = 100;
  return gd;
};

export default grade;