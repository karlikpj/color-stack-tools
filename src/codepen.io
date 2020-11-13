const baseColors = ["#201FF3", "#f9319f", "#33FF9f", "#f9f100"];

const ColorChips = (props) => {
  const { tc, stackSize } = props;

  const toHex = (n) => {
    var h = (~~n).toString(16);
    if (h.length < 2) h = "0" + h;
    return h;
  };

  const lightStack = [];
  const darkStack = [];
  const dc = [
    (255 - tc[0]) / stackSize,
    (255 - tc[1]) / stackSize,
    (255 - tc[2]) / stackSize
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

    lightStack.push(
      <li className="stackItem" key={`LT_${bgColor}_${i}`}>
        <div className="chipHex">
          <div className="chip" style={{ backgroundColor: bgColor }} />
          {bgColor}
        </div>
      </li>
    );

    darkStack.push(
      <li className="stackItem" key={`DK_${bgColor}_${i}`}>
        <div className="chipHex">
          <div className="chip" style={{ backgroundColor: fbColor }} />
          {fbColor}
        </div>
      </li>
    );
  }

  const colorStack = lightStack.concat(darkStack);

  return <ul className="colorStack">{colorStack}</ul>;
};

const ColorStack = (props) => {
  const { color, stackSize } = props;
  const [targetColor, setTargetColor] = React.useState(color);

  React.useEffect(() => {
    setTargetColor(color);
  }, [color]);

  const handleDelete = () => {
    props.removeColor(targetColor);
  };

  const handleColor = (e) => {
    setTargetColor(e.target.value);
  };

  const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        ]
      : null;
  };

  return (
    <div className="stackWrapper">
      <a href="#" className="delete" onClick={(e) => handleDelete(e)}>
        delete
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

const ColorStackGenerator = (props) => {
  const [stackSize, setStackSize] = React.useState(8);
  const [liveStacks, setLiveStacks] = React.useState(baseColors);

  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777214).toString(16);
  };

  const handleSelect = (e) => {
    setStackSize(e.target.value);
  };

  const handleClick = () => {
    const newStack = JSON.parse(JSON.stringify(liveStacks));
    newStack.push(randomColor());
    setLiveStacks(newStack);
  };

  const handleDelete = (color) => {
    if (liveStacks.length < 2) return;
    let newStack = JSON.parse(JSON.stringify(liveStacks));
    const i = newStack.findIndex((colors) => colors === color);
    console.log(newStack[i]);
    newStack.splice(i, 1);
    setLiveStacks(newStack);
  };

  const dropDown = (
    <select value={stackSize} onChange={handleSelect}>
      <option value="4">4</option>
      <option value="8">8</option>
      <option value="12">12</option>
      <option value="16">16</option>
      <option value="20">20</option>
      <option value="20">24</option>
    </select>
  );

  const makeStacks = (stacks) => {
    return stacks.map((item, index) => {
      return (
        <div className="wrapper" key={`STACK_${index}_${index}`}>
          <ColorStack
            color={item}
            removeColor={handleDelete}
            stackSize={~~(stackSize / 2)}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <div className="header">
        <h1>Color Stack Generator</h1>
        <ul className="controls">
          <li>stack size</li>
          <li>{dropDown}</li>
          <li>&nbsp;</li>
          <li>
            <a href="#" onClick={handleClick}>
              add
            </a>
          </li>
        </ul>
      </div>
      {makeStacks(liveStacks)}
    </div>
  );
};

// Attach to DOM
ReactDOM.render(
  <ColorStackGenerator />,
  document.getElementById("react-mount")
);
