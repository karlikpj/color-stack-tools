const toHex = (n) => {
  var h = (~~n).toString(16);
  if (h.length < 2) h = "0" + h;
  return h;
};

export default toHex;
