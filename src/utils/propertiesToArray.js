const propertiesToArray = (obj) => {
  const isObject = (val) => typeof val === "object" && !Array.isArray(val);
  const addDelimiter = (a, b) => (a ? `${a}.${b}` : b);
  const paths = (obj = {}, head = "") => {
    return Object.entries(obj).reduce((product, [key, value]) => {
      //return key;
      let fullPath = addDelimiter(head, key);
      return isObject(value)
        ? product.concat(fullPath)
        : product.concat(fullPath);
    }, []);
  };
  return paths(obj);
};

export default propertiesToArray;
