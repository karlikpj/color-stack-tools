const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777214).toString(16);
};

export default randomColor;
